import { error } from '@sveltejs/kit';
import { api } from '../../db'

export async function load() {
	const res = await api('GET', `posts`);

	if (res.ok) {
		const data = await res.json();
		return { posts: data };
	}

	throw error(res.status);
};
