import { error } from '@sveltejs/kit';
import { api } from '../../db'

export async function load() {
	const res = await api('GET', `webinars`);

	if (res.ok) {
		const data = await res.json().data;
		return { webinars: data };
	}

	throw error(res.status);
};