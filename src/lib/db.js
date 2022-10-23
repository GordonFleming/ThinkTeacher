import { API_URL, BASE_API_URL, strapiKey } from "$lib/env.js";

export function api(method, endpoint, data) {
	return fetch(`${API_URL}/${endpoint}`, {
		method,
		headers: {
			'content-type': 'application/json',
            'Authorization': 'Bearer ' + strapiKey
		},
		body: data && JSON.stringify(data)
	});
}

export function apiGraph(method, endpoint, data) {
	return fetch(`${BASE_API_URL}/${endpoint}`, {
		method,
		headers: {
			'content-type': 'application/json',
            'Authorization': 'Bearer ' + strapiKey
		},
		body: data && JSON.stringify(data)
	});
}