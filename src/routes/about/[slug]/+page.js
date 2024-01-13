import { error } from '@sveltejs/kit';
import { persons } from "./data.json";

export function load({ params }) {
    const { slug } = params;

    if (!persons.hasOwnProperty(slug)) {
        error(404, `Not found, ${slug}`);
    }

	if (persons.hasOwnProperty(slug)) {
        const data = persons[slug];

		return { person: data };
	}

	error(res.status);
};