/* eslint-disable import/prefer-default-export */

import Fallback from './Fallback.svelte';

/**
 * src/routes/blog/+page.js
 */
/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  
  return {
    page: {
    component: import('./Fallback.svelte'),
    title: 
  }
}
}
