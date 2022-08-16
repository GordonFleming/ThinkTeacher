import { API_URL } from "$lib/env.js";
import { error } from '@sveltejs/kit';


export async function load({ params, fetch }) {
	const { slug } = params;
	const res = await fetch(`${API_URL}/partners?slug=${slug}`);
	const data = await res.json();

	if (data.length > 0) {
		return { partner: data[0] };
	}

    throw error(404, `The partner with slug of ${slug} was not found`)
}
