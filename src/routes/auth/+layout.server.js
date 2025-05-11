import { redirect } from '@sveltejs/kit';

export function load({ locals, url }) {
    // If no user, redirect to login with return URL
    if (!locals.user) {
        const currentPath = url.pathname;
        throw redirect(302, `/login?r=${encodeURIComponent(currentPath)}`);
    }

    // Check if user is a paid member
    // Note: You'll need to ensure this data is available in locals.user
    // const paidMember = locals.user.paid;
    
    // Uncomment and modify this section if you want to enforce payment
    // if (!paidMember) {
    //     throw redirect(302, '/payment');
    // }
    
    return {
        user: locals.user
    };
}