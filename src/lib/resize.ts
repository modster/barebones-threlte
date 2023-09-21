import { onMount } from '@sveltejs/kit';
// import { width, height } from '$lib/hxw';
import { writable } from 'svelte/store';

export let width = writable(0);
export let height = writable(0);

/**
 * resize the ui when/if the window changes size
 */
export function Resize() {
	onMount(() => {
		function resize() {
			width.set(window.innerWidth);
			height.set(window.innerHeight);
		}

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
}
