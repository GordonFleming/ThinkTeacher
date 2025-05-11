import { error } from '@sveltejs/kit';
import { api } from '$lib/server/db'; // Assuming you have an 'api' function for REST requests

export async function load() {
    // Create the REST endpoint with query parameters for sorting, pagination, and populating related data
    const endpoint = `partners?sort=company_name&pagination[limit]=20&populate[logo]=*&populate[category]=*`;
    
    // Make the REST request
    const res = await api('GET', endpoint);
    const data = await res.json();
    
    if (res.status === 404 || data.data.length === 0) {
        throw error(404, `No partners found`);
    }
    
    if (res.ok) {
        return { partners: data.data };
    }
    
    throw error(res.status);
}