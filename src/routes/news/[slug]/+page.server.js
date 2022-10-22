import { error } from '@sveltejs/kit';
import { apiGraph } from '$lib/db';

export async function load({ params }) {
    const { slug } = params;
	const endpoint = `graphql`;
	const graphqlQuery = {
		operationName: "fetchPost",
		query: `query fetchPost {     
            posts (filters: {slug: {eq: "${slug}"}}) {
                data {
                    attributes {
                        title,
                        slug,
                        pdf {
                            data {
                                attributes{
                                    url
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

    if (res.status === 404 || data.data.posts.data.length === 0) {
        throw error(404, `No post found, ${slug}`);
    }

	if (res.ok) {
		return { post: data.data.posts.data[0].attributes };
	}

	throw error(res.status);
};
