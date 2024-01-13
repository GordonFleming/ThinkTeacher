import { error } from '@sveltejs/kit';
import { api } from '$lib/db'

export async function load() {
	const res = await api('GET', `posts?sort=updatedAt:desc`);
	if (res.ok) {
		const data = await res.json();

		return { posts: data.data };
	}

	throw error(res.status);
};
