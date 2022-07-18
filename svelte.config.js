import adapter from '@sveltejs/adapter-auto';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
        prerender: {
            default: true,
            entries: ['*', '/robots.txt', '/sitemap.xml']
          }
	},
};

export default config;
