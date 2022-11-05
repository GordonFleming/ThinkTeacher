import { error } from '@sveltejs/kit';
import { api } from '$lib/db'

export async function load() {
	const res = await api('GET', `categories?sort=name`);
	if (res.ok) {
		const data = await res.json();

		return { benefits: data.data };
	}

	throw error(res.status);
};