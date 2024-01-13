import { error } from '@sveltejs/kit';
import { apiGraph } from '$lib/db';

export async function load({ params }) {
	const { slug } = params;
    const endpoint = `graphql`;
	const graphqlQuery = {
		operationName: "fetchPartner",
		query: `query fetchPartner {
            partners (filters: {slug: {eq: "${slug}"}}) {
                data {
                    attributes {
                        name,
                        description,
                        company_name,
                        bio,
                        webinar,
                        logo {
                            data {
                                attributes {
                                    url
                                }
                            }
                        },
                        images {
                            data {
                                attributes {
                                    url
                                }
                            }
                        },
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

    if (res.status === 404 || data.data.partners.data.length === 0) {
        error(404, `No partner found, ${slug}`);
    }

	if (res.ok) {
		return { partner: data.data.partners.data[0].attributes };
	}

	error(res.status);
}
