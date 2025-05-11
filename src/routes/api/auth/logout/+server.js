import { json } from '@sveltejs/kit';

/**
 * Handle POST requests to /api/auth/logout
 * @type {import('./$types').RequestHandler}
 */
export async function POST({ cookies }) {
    try {
        // Clear the JWT cookie
        cookies.delete('jwt', { path: '/' });
        
        return json({ success: true });
    } catch (error) {
        console.error('Logout error:', error);
        return json({ success: false, error: 'Server error' }, { status: 500 });
    }
}
