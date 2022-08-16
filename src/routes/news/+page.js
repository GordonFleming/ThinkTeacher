import { error } from '@sveltejs/kit';

import { API_URL } from "$lib/env.js";

export const load = async ({ fetch }) => {
	const res = await fetch(`${API_URL}/posts`);

	if (res.ok) {
		const data = await res.json();
		return { posts: data };
	}

	throw error(500, `Could not load ${url}`);
};
