import { goto } from "$app/navigation";

// DEPRECATED: Use userStore.logout() instead from context
export async function logoutUser() {
    console.warn("logoutUser() is deprecated. Use the userStore.logout() method instead.");
    
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
    
    const hasRealProfile = !!userData.firstName; // Only true if profile has an ID (exists in database)
    
    // Create a flattened user object with proper data sources
    const processedData = {
        id: userData.id,
        email: userData.email,
        username: userData.username,
        ttCode: userData.ttCode || '', // From user directly
        
        // Profile data at the top level
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        
        // Flag to indicate if the user has a real profile (with ID)
        hasProfile: hasRealProfile,
        
        // Store the JWT if it exists
        jwt: userData.jwt || null,
    };
    
    return processedData;
} 