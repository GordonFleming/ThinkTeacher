import { api } from '../../../db'
import { error } from '@sveltejs/kit';

export async function load({ params }) {
	const { slug } = params;
    const res = await api('GET', `partners?slug=${slug}`);
	const data = await res.json();

    if (res.status === 404 || data.length === 0) {
        throw error(404, `No partner with, ${params} was found`);
    }

	if (res.ok) {
		return { partner: data[0] };
	}

	throw error(res.status);
}
