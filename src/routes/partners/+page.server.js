import { error } from '@sveltejs/kit';
import { apiGraph } from '../../db'

export async function load() {
	const endpoint = `graphql`;
	const graphqlQuery = {
		operationName: "fetchPartners",
		query: `query fetchPartners {     
            partners (sort: "id") {
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
        throw error(404, `No partners found`);
    }

	if (res.ok) {
		return { partners: data.data.partners };
	}

	throw error(res.status);
};
