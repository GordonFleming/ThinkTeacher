import { json } from '@sveltejs/kit';

export async function POST({ cookies, locals }) {
    // Clear the JWT cookie
    cookies.delete('jwt', { path: '/' });
    console.log(locals.user)
    locals.user = null;
    
    return json({ success: true });
}
