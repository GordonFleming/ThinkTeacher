import { API_URL } from "$lib/env.js";
import { STRAPI_KEY } from "$env/static/private";
import { error } from "@sveltejs/kit";
import { ttCodeGen } from "$lib/utils.js";

/** @type {import('./$types').PageServerLoad} */
export async function load({ url, cookies, locals, fetch }) {
  const accessToken = url.searchParams.get("access_token");
  const generatedTTCode = ttCodeGen();

  if (!accessToken) {
    return {
      error: "No access token provided",
    };
  }

  try {
    // Exchange Google token for Strapi JWT and user data
    const response = await fetch(
      `${API_URL}/auth/google/callback?access_token=${accessToken}`,
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.error?.message || "Failed to authenticate with the API",
      );
    }

    const userData = await response.json();

    if (!userData.jwt || !userData.user) {
      throw new Error("Invalid response from authentication service");
    }

    // Set the JWT cookie for future requests
    cookies.set("jwt", userData.jwt, {
      path: "/",
      httpOnly: true, // Cannot be accessed by client-side JavaScript
      secure: process.env.NODE_ENV === "production", // Only send over HTTPS in production
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    if (!userData.user.ttCode) {
      // Generate TT number for the user
      const ttNumberResponse = await fetch(
        `${API_URL}/users/${userData.user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${STRAPI_KEY}`,
          },
          body: JSON.stringify({
            ttCode: generatedTTCode,
          }),
        },
      );
    }

    // Fetch complete user data with populated profile
    try {
      const userResponse = await fetch(
        `${API_URL}/users/${userData.user.id}?populate=profile`,
        {
          headers: {
            Authorization: `Bearer ${STRAPI_KEY}`,
          },
        },
      );

      if (userResponse.ok) {
        const completeUserData = await userResponse.json();
        // Set the complete user data in locals
        locals.user = {
          ...completeUserData,
          jwt: userData.jwt,
        };
        console.log(
          "Complete user data fetched and set in locals:",
          completeUserData.id,
        );
      } else {
        // Fallback to using the initial user data
        locals.user = {
          ...userData.user,
          jwt: userData.jwt,
        };
        console.log("Using initial user data:", userData.user.id);
      }
    } catch (userFetchError) {
      console.error("Error fetching complete user data:", userFetchError);
      // Still set the user data from the initial response
      locals.user = {
        ...userData.user,
        jwt: userData.jwt,
      };
    }

    // The complete user data already contains profile information
    // so we can check if the user has a profile
    if (locals.user && locals.user.profile) {
      return {
        success: true,
        redirect: "/benefits",
        user: {
          id: locals.user.id,
          username: locals.user.username,
          email: locals.user.email,
          ttCode: locals.user.ttCode ? locals.user.ttCode : generatedTTCode,
          hasProfile: true,
        },
      };
    }

    // Default redirect to profile creation if no existing profile
    return {
      success: true,
      redirect: "/auth/profile",
      user: {
        id: locals.user.id,
        username: locals.user.username,
        email: locals.user.email,
        ttCode: locals.user.ttCode ? locals.user.ttCode : generatedTTCode,
        hasProfile: false,
      },
    };
  } catch (err) {
    console.error("OAuth authentication error:", err);

    // If it's a redirect, just pass it through
    if (err.status && err.location) {
      throw err;
    }

    // If it's SvelteKit's error, pass it through
    if (err instanceof error) {
      throw err;
    }

    // Otherwise return the error
    return {
      error: err.message || "Something went wrong during authentication",
      success: false,
    };
  }
}
