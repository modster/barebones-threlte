import { writable } from "svelte/store";

/** @type import('svelte/store').Writable<number> */
export let footer = writable(0);
export let widthOffset = writable(0);
export let heightOffset = writable(0);
export let paddingBottom = writable(0);
export let height = writable(0);
export let width = writable(0);
export let pageFooter = writable(0);
