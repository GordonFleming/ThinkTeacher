import { API_URL } from "$lib/env.js";

export function api(method, endpoint, data) {
	return fetch(`${API_URL}/${endpoint}`, {
		method,
		headers: {
			'content-type': 'application/json'
		},
		body: data && JSON.stringify(data)
	});
}