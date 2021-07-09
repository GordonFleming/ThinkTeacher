import adapter from '@sveltejs/adapter-netlify';

const config = {
	kit: {
		adapter: adapter(), // currently the adapter does not take any options
		target: '#svelte'
	}
};

export default config;
