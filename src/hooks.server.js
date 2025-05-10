import { API_URL } from '$lib/env.js';

export async function handle({ event, resolve }) {
    const token = event.cookies.get('jwt');
    
    if (token) {
        try {
            // Verify token with Strapi
            const response = await fetch(`${API_URL}/users/me`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // TODO: add any other useful user data here like profile data

            if (!response.ok) {
                throw new Error('Invalid token');
            }

            const userData = await response.json();
            
            // Set user info in locals for access in load functions
            event.locals.user = {
                id: userData.id,
                email: userData.email,
                username: userData.username,
                ttCode: userData.ttCode,
                firstName: userData.firstName,
                lastName: userData.lastName,
                jwt: token,
                // Add any other user data you need
            };
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