import { writable } from "svelte/store";
import { goto, invalidate } from "$app/navigation";
import { processUserData } from "$lib/utils.js";

// Create a user store with flattened data structure
export const createUserStore = (initialUser = null) => {
  // Process and flatten initial user data
  const processedInitialUser = processUserData(initialUser);

  const { subscribe, set, update } = writable(processedInitialUser);

  // Store singleton
  const store = {
    subscribe,
    set: (userData) => {
      // Process and flatten incoming user data
      const processedUserData = processUserData(userData);
      set(processedUserData);
    },
    update,

    // Login the user using our server-side API
    async login(identifier, password) {
      try {
        // Use our server-side endpoint for login
        const response = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ identifier, password }),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Login failed");
        }

        const processedUserData = processUserData(data.user);
        // Update the store
        set(processedUserData);

        // Invalidate all data to refresh user state throughout the app
        await invalidate("app:user");

        return { success: true, user: processedUserData };
      } catch (error) {
        return { success: false, error: error.message };
      }
    },

    // Logout the user using our server-side API
    async logout() {
      try {
        // Use our server-side endpoint for logout
        await fetch("/api/auth/logout", {
          method: "POST",
        });

        // Reset the store
        set(null);

        // Invalidate all data
        await invalidate("app:user");

        // Redirect to login
        goto("/login");

        return { success: true };
      } catch (error) {
        console.error("Logout error:", error);
        return { success: false, error: error.message };
      }
    },

    // Check if the user is logged in
    isLoggedIn() {
      let currentUser = null;
      subscribe((value) => {
        currentUser = value;
      })();
      return !!currentUser;
    },

    // Get user's full name
    getFullName() {
      let user = null;
      subscribe((value) => {
        user = value;
      })();

      if (!user) return "Guest";

      // Use firstName if available
      if (user.firstName) {
        return user.firstName;
      }

      // Fallback to email
      return user.email;
    },

    // Check if the user has a profile
    hasProfile() {
      let user = null;
      subscribe((value) => {
        user = value;
      })();

      return !!user?.hasProfile;
    },
  };

  return store;
};
