import { API_URL, BASE_API_URL, STRAPI_KEY } from "$lib/env.js";

export function api(method, endpoint, data) {
	return fetch(`${API_URL}/${endpoint}`, {
		method,
		headers: {
			'content-type': 'application/json',
            'Authorization': 'Bearer ' + STRAPI_KEY
		},
		body: data && JSON.stringify(data)
	});
}