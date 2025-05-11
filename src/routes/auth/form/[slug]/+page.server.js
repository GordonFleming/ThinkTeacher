import { error } from '@sveltejs/kit';
import { api } from '$lib/server/db'
import { API_URL } from '$lib/env.js';

export async function load({ params, locals }) {
    const { slug } = params;
	const res = await api('GET', `categories?filters[name][$eqi]=${slug.replace("-", "_")}`);

    // call users/me
    const resUser = await fetch(`${API_URL}/users/me`, {
        headers: {
            'Authorization': `Bearer ${locals.user.jwt}`
        }
    });
    const user = await resUser.json();

    const data = await res.json();

    if (res.status === 404 || data.data.length === 0) {
        throw error(404, `No form found, ${slug}`);
    }

	if (res.ok) {
		return { type: data.data[0].attributes, user };
	}

	throw error(res.status);
};