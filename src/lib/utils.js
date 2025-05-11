import { goto } from "$app/navigation";
export async function logoutUser() {
    // Clear client-side cookie
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    // Clear server-side session
    try {
        await fetch("/api/auth/logout", { method: "POST" });
    } catch (error) {
        console.error("Logout error:", error);
    } finally {
        // Always redirect to home page
        goto("/", { invalidateAll: true });
        // window.location.href = "/";
    }
} 