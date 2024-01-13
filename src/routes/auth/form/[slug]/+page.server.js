import { error } from '@sveltejs/kit';
import { api } from '$lib/db'

export async function load({ params }) {
    const { slug } = params;
	const res = await api('GET', `categories?filters[name][$eqi]=${slug.replace("-", "_")}`);

    const data = await res.json();

    if (res.status === 404 || data.data.length === 0) {
        error(404, `No form found, ${slug}`);
    }

	if (res.ok) {
		return { type: data.data[0].attributes };
	}

	error(res.status);
};