// @ts-nocheck
import { posts } from '../data.js'
import Fallback from '../fallback.svelte'
/** @type {import('../$types.js').PageLoad} */
export async function load({ params }) {

    const slug = posts.find((post) => post.slug === params.slug)


    return {
        slug
    }
}
