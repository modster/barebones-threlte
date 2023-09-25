import { writable } from 'svelte/store';

/** @type import('svelte/store').Writable<number> */
export let footer = writable(0);
export let width = writable(0);
export let height = writable(0);

// function createCount() {
// 	const { subscribe, set, update } = writable(0);

// 	return {
// 		subscribe,
// 		increment: () => update((n) => n + 1),
// 		decrement: () => update((n) => n - 1),
// 		reset: () => set(0)
// 	};
// }

// export const count = createCount();
