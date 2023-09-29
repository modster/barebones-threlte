import { posts } from "./data"
let title = "test"

export function load() {
  return {
    summaries: posts.map((post) => ({
      slug: post.slug,
      title: post.title,
    })),
    test: { title },
  }
}
