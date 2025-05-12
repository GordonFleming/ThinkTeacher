<script>
    import { onMount } from "svelte";
    import { invalidate } from "$app/navigation";
    import { goto } from "$app/navigation";
    import { getContext } from "svelte";

    export let data;

    // Get user store from context
    const userStore = getContext("user");

    onMount(async () => {
        try {
            console.log("OAuth redirect data:", data);

            // Force update of user state if we have user data
            if (data.success && data.user) {
                userStore.set(data.user);
                console.log("User store updated with:", data.user);
            }

            // Invalidate all data to refresh user state throughout the app
            await invalidate("app:user");

            // Short delay to ensure store updates propagate
            await new Promise((resolve) => setTimeout(resolve, 300));

            // Use the redirect path from the server if available
            if (data.success && data.redirect) {
                // Log before navigation
                console.log("Redirecting to:", data.redirect);
                console.log(
                    "Current user state:",
                    userStore.isLoggedIn() ? "Logged in" : "Not logged in",
                );

                // Use SvelteKit navigation instead of raw location change
                // This ensures the layout data is refreshed properly
                goto(data.redirect);
            } else if (data.error) {
                // Handle error case
                console.error("Authentication error:", data.error);
                goto("/login?error=" + encodeURIComponent(data.error));
            } else {
                // Default fallback
                goto("/auth/profile");
            }
        } catch (error) {
            console.error("Error during redirect:", error);
            // Fallback to direct navigation if something goes wrong
            window.location.href = "/auth/profile";
        }
    });
</script>

<div class="container text-center my-5">
    {#if data.error}
        <div class="alert alert-danger" role="alert">
            <h2>Authentication Error</h2>
            <p>{data.error}</p>
            <a href="/login" class="btn bg-gold mt-3">Return to Login</a>
        </div>
    {:else}
        <h2>Authentication successful</h2>
        <p>Redirecting you to {data.redirect || "/auth/profile"}...</p>
        <div class="spinner-border mt-3" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    {/if}
</div>
