import { API_URL } from "$lib/env.js";
import { error } from '@sveltejs/kit';

export async function load({ params, fetch }) {
	const { slug } = params;
	const res = await fetch(`${API_URL}/posts?slug=${slug}`);
	const data = await res.json();

	if (data.length > 0) {
		return { post: data[0] };
	}

    throw error(404, `The news with slug of ${slug} was not found`)
}
