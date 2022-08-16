import { error } from '@sveltejs/kit';

import { API_URL } from "$lib/env.js";

export const load = async ({ fetch }) => {
	const endpoint = `${API_URL}/graphql`;
	const headers = {
		"content-type": "application/json",
	};
	const graphqlQuery = {
		operationName: "fetchPartners",
		query: `query fetchPartners {     
                partners (sort: "id") {
                    id,
                    name,
                    description,
                    logo{hash,ext},
                    company_name,
                    category{name},
                    slug
                } 
            }`,
		variables: {},
	};

	const options = {
		method: "POST",
		headers: headers,
		body: JSON.stringify(graphqlQuery),
	};

	const res = await fetch(endpoint, options);

	if (res.ok) {
		const data = await res.json();
		return { partners: data.data.partners };
	}

	throw error(500, `Could not load page`);
};
