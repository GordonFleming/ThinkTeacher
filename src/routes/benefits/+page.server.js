import { error } from '@sveltejs/kit';
import { api } from '$lib/server/db'

export async function load() {
	const res = await api('GET', `categories?populate[0]=img&sort=name`);
	if (res.ok) {
		const data = await res.json();

		return { benefits: data.data };
	}

	throw error(res.status);
};