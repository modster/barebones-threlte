// @ts-nocheck
import { posts } from '../data.js'
import Fallback from './Fallback.svelte'

/** @type {import('./$types.js').PageLoad} */
export async function load({ params }) {

    // const slug = posts.find((post) => post.slug === params.slug)


    return {

        post: {
            title: slug.title,
            // content: {
            //     text: slug.content.text,
            //     fontSize: slug.content.fontSize
            // },
            // component: Fallback
        },

    }

}

}