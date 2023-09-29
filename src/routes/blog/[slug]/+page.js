/* eslint-disable import/prefer-default-export */

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
  return {
    post: {
      title: `Title for ${params.slug} goes here`,
      content: `<p>
        penis
      </p>`,
    },
  };
}
