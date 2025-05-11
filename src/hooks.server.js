import { API_URL } from '$lib/env.js';
import { processUserData } from '$lib/utils.js';
import { STRAPI_KEY } from '$env/static/private';

export async function handle({ event, resolve }) {
    const token = event.cookies.get('jwt');
    
    if (token) {
        try {
            // Verify token with Strapi and fetch complete user data including profile
            const response = await fetch(`${API_URL}/users/me?populate=profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            const userData = await response.json();

            // Fetch complete user data with profile
            const profileResponse = await fetch(`${API_URL}/profiles?filters[user][id][$eq]=${userData.id}`, {
                headers: {
                    'Authorization': `Bearer ${STRAPI_KEY}`
                }
            });
            const profileData = await profileResponse.json();
            console.log("profileData:", profileData);
            
            // Process user data to flatten the structure
            console.log("userData:", processUserData({
                ...userData,
                ...profileData.data[0].attributes,
                jwt: token
            }));
            event.locals.user = processUserData({
                ...userData,
                ...profileData.data[0].attributes,
                jwt: token
            });
            
        } catch (error) {
            console.error('Auth error:', error);
            // Token invalid - clear cookie
            event.cookies.delete('jwt', { path: '/' });
            event.locals.user = null;
        }
    } else {
        event.locals.user = null;
    }
    
    return resolve(event);
}