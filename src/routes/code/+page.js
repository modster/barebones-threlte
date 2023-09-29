/**
 * snippet server
 * displays code
 * documentation
 * bookmarks
 * hashes snippets
 * meta data
 * clipboard
 * extensions?
 */

/** @type {import('./$types').PageLoad}  */
export function load({ params }) {
  return {
    post: {
      title: `Title for ${params.slug} goes here`,
      content: `Content for ${params.slug} goes here`,
    },
  }
}
