import { API_URL } from "$lib/env.js";
import { STRAPI_KEY } from "$env/static/private";

export async function handle({ event, resolve }) {
  const token = event.cookies.get("jwt");

  if (token) {
    try {
      // Verify token with Strapi and fetch complete user data including profile
      const response = await fetch(`${API_URL}/users/me?populate=profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid token");
      }

      const userData = await response.json();

      // Set user data with token in locals
      event.locals.user = userData;
    } catch (error) {
      console.error("Auth error:", error);
      // Token invalid - clear cookie
      event.cookies.delete("jwt", { path: "/" });
      event.locals.user = null;
    }
  } else {
    event.locals.user = null;
  }

  return resolve(event);
}
