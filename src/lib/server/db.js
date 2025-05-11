import { API_URL } from "$lib/env.js";
import { STRAPI_KEY } from '$env/static/private';

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