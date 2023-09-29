// @ts-nocheck
import { posts } from './data.js'
import Fallback from './fallback.svelte'
/** @type {import('../$types.js').PageLoad} */
export async function load() {

    // const slug = posts.find((post) => post.slug === params.slug)
    // let component

    return {

        post: {
            title: "test",
        }

    }

}