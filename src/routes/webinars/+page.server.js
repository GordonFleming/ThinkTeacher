import { error } from '@sveltejs/kit';
import { api } from '$lib/db'

export async function load() {
	const res = await api('GET', `webinars?populate[0]=webinar_category&sort[0]=createdAt:desc`);

	if (res.ok) {
		const data = await res.json();
		return { webinars: data.data };
	}

	error(res.status);
};