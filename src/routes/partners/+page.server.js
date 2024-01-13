import { error } from '@sveltejs/kit';
import { apiGraph } from '$lib/db';

export async function load() {
	const endpoint = `graphql`;
	const graphqlQuery = {
		operationName: "fetchPartners",
		query: `query fetchPartners {     
            partners (sort: "company_name", pagination: { limit: 20 }) {
                data {
                    attributes {
                        name,
                        description,
                        company_name,
                        slug,
                        logo {
                            data {
                                attributes{
                                    url
                                }
                            }
                        }
                        category {
                            data {
                                attributes {
                                    name
                                }
                            }
                        }
                    }
                } 
            }		
        }`,
		variables: {},
	};

	const res = await apiGraph('POST', endpoint, graphqlQuery);
    const data = await res.json();

    if (res.status === 404 || data.length === 0) {
        error(404, `No partners found`);
    }

	if (res.ok) {
		return { partners: data.data.partners.data };
	}

	error(res.status);
};
