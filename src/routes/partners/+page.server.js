import { error } from '@sveltejs/kit';
import { api } from '../../db'

export async function load() {
	const endpoint = `graphql`;
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

	const res = await api('POST', endpoint, graphqlQuery);
    const data = await res.json();

    if (res.status === 404 || data.length === 0) {
        throw error(404, `No partners found`);
    }

	if (res.ok) {
		return { partners: data.data.partners };
	}

	throw error(res.status);
};
