import { error } from '@sveltejs/kit';
import { api } from '$lib/db'; // Assuming you have an 'api' function for REST requests

export async function load({ params }) {
    const { slug } = params;
    
    // Create the REST endpoint with query parameters for filtering and sorting
    const endpoint = `packages?filters[partner][category][name][$eq]=${slug}&sort=name&populate[banner]=*&populate[partner][populate][category]=*&populate[partner][populate][logo]=*`;
    
    // Make the REST request
    const res = await api('GET', endpoint);
    const data = await res.json();
    
    if (res.status === 404 || data.data.length === 0) {
        throw error(404, `Benefits for ${slug}, coming soon`);
    } else {
        if (res.ok) {
            return { packages: data.data, slug: slug };
        }
        throw error(res.status);
    }
}