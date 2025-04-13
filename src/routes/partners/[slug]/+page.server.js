import { error } from '@sveltejs/kit';
import { api } from '$lib/db'; // Assuming you have an 'api' function for REST requests

export async function load({ params }) {
    const { slug } = params;
    
    // Create the REST endpoint with query parameters for filtering and populating related data
    const endpoint = `partners?filters[slug][$eq]=${slug}&populate[logo]=*&populate[images]=*&populate[category]=*`;
    
    // Make the REST request
    const res = await api('GET', endpoint);
    const data = await res.json();
    
    if (res.status === 404 || data.data.length === 0) {
        throw error(404, `No partner found, ${slug}`);
    }
    
    if (res.ok) {
        return { partner: data.data[0].attributes };
    }
    
    throw error(res.status);
}