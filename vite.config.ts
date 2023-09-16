import adapter from '@sveltejs/adapter-vercel';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

/** @type {import('@sveltejs/kit').Config} */
export default defineConfig({
	plugins: [sveltekit(), purgeCss()],
	adapter: adapter({}),
	ssr: {
		noExternal: ['three']
	}
});
