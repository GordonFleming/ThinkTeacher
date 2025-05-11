import { error } from '@sveltejs/kit';
import { api } from '$lib/server/db'; // Assuming you have an 'api' function for REST requests

export async function load({ params }) {
    const { slug } = params;
    
    // Create the REST endpoint with query parameters for filtering and populating related data
    const endpoint = `posts?filters[slug][$eq]=${slug}&populate[pdf]=*`;
    
    // Make the REST request
    const res = await api('GET', endpoint);
    const data = await res.json();
    
    if (res.status === 404 || data.data.length === 0) {
        throw error(404, `No post found, ${slug}`);
    }
    
    if (res.ok) {
        return { post: data.data[0].attributes };
    }
    
    throw error(res.status);
}