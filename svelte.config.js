import adapter from '@sveltejs/adapter-auto';

const config = {
	kit: {
		adapter: adapter(),
        prerender: {
            default: true,
            entries: ['/sitemap.xml']
          }
	},
};

export default config;
