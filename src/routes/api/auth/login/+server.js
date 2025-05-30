import { json } from '@sveltejs/kit';
import { API_URL } from '$lib/env.js';
import { STRAPI_KEY } from '$env/static/private';
/**
 * Handle POST requests to /api/auth/login
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ request, cookies }) {
    try {
        // Get credentials from request body
        const { identifier, password } = await request.json();
        
        if (!identifier || !password) {
            return json({ success: false, error: 'Email and password are required' }, { status: 400 });
        }
        
        // Forward the request to Strapi
        const response = await fetch(`${API_URL}/auth/local`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            return json({ 
                success: false, 
                error: data.error?.message || 'Authentication failed' 
            }, { status: response.status });
        }
        
        // Get the JWT token
        const jwt = data.jwt;
        
        // Fetch complete user data with populated profile
        const userResponse = await fetch(`${API_URL}/users/${data.user.id}?populate=profile`, {
            headers: {
                'Authorization': `Bearer ${STRAPI_KEY}`
            }
        });
        
        if (!userResponse.ok) {
            return json({ 
                success: false, 
                error: 'Failed to fetch user data' 
            }, { status: userResponse.status });
        }
        
        const userData = await userResponse.json();
        
        // Set the JWT as a cookie
        cookies.set('jwt', jwt, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            // secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });
        
        // Return user data with JWT
        return json({
            success: true,
            user: {
                ...userData,
                jwt
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        return json({ success: false, error: 'Server error' }, { status: 500 });
    }
} 