import { goto } from "$app/navigation";

// DEPRECATED: Use userStore.logout() instead from context
export async function logoutUser() {
  console.warn(
    "logoutUser() is deprecated. Use the userStore.logout() method instead.",
  );

  // Clear client-side cookie
  document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

  // Clear server-side session
  try {
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (error) {
    console.error("Logout error:", error);
  } finally {
    // Always redirect to home page
    goto("/");
  }
}

export function processUserData(userData) {
  if (!userData) return null;

  const profile = userData.profile || {};
  const hasRealProfile = !!profile.firstName;

  // Create a flattened user object with proper data sources
  const processedData = {
    id: userData.id,
    email: userData.email,
    username: userData.username,
    ttCode: userData.ttCode || "", // From user directly

    // Profile data at the top level
    firstName: profile.firstName || "",
    lastName: profile.lastName || "",

    // Flag to indicate if the user has a real profile (with ID)
    hasProfile: hasRealProfile,

    // Store the JWT if it exists
    jwt: userData.jwt || null,
  };

  return processedData;
}

export function ttCodeGen() {
  // TT Code Gen
  let ttCode = "TT";
  var dateObj = new Date();
  var dateNow = dateObj.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  ttCode += dateNow.replace(new RegExp("/", "g"), "");
  ttCode += Math.floor(Math.random() * 899 + 100);

  return ttCode;
}
