import { json } from "@sveltejs/kit";

import db from "$lib/database.js";

export async function GET(event) {
  const posts = await db.post.findMany({
    // get random numbers of posts to test caching
    take: Math.round(Math.random() * 30),
  });

  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching
  event.setHeaders({
    "Cache-Control": "max-age=60",
  });

  return json(posts);
}
