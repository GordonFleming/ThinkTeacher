import { error } from '@sveltejs/kit';
import { apiGraph } from '$lib/db';

export async function load({ params }) {
    const { slug } = params;
	const endpoint = `graphql`;
	const graphqlQuery = {
		operationName: "fetchPackages",
		query: `query fetchPackages {     
            packages (filters: {partner: {category: {name: {eq: "${slug}"}}}}) {
                data {
                    attributes {
                        name,
                        name,
                        description,
                        details,
                        banner {
                                data {
                                    attributes {
                                        url
                                }
                            }
                        },
                        partner {
                            data {
                                attributes {
                                    company_name,
                                    description,
                                    category {
                                        data {
                                            id
                                            attributes {
                                                name
                                            }
                                        }
                                    },
                                    logo {
                                        data {
                                            attributes {
                                                    url
                                            }
                                        }
                                    }
                                    slug
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

    if (res.status === 404 || data.data.packages.data.length === 0) {
        throw error(404, `Benefits for ${slug}, coming soon`);
    }

	if (res.ok) {
		return { packages: data.data.packages.data, slug: slug };
	}

	throw error(res.status);
};
