import { error } from '@sveltejs/kit';
import { api } from '../../../db'

export async function load({ params }) {
	const { slug } = params;
    const res = await api('GET', `posts?slug=${slug}`);

	const data = await res.json();

    if (res.status === 404 || data.length === 0) {
        throw error(404, `No news with, ${params} was found`);
    }

	if (res.ok) {
		return { post: data[0] };
	}

	throw error(res.status);
}
