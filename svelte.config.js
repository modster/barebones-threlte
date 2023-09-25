import { vitePreprocess } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-cloudflare';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte'],
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [vitePreprocess()],

	vitePlugin: {
		inspector: true
	},

	kit: {
		adapter: adapter({
			// See below for an explanation of these options
			routes: {
				include: ['/src/lib/functions/*'],
				exclude: ['<all>']
			}
		})
	}
};
export default config;
