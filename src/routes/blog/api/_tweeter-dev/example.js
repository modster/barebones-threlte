// @ts-nocheck
import { json } from "@sveltejs/kit";

/** @type {import('../../api/binance/$types').RequestHandler} */
export function GET({ request }) {
  // log all headers
  console.log(...request.headers);

  // create a JSON Response using a header we received
  return json(
    {
      // retrieve a specific header
      userAgent: request.headers.get("user-agent"),
    },
    {
      // set a header on the response
      headers: { "x-custom-header": "potato" },
    }
  );
}

/** @type {import('../../api/binance/$types').RequestHandler} */
export async function POST(event) {
  const body = await event.request.formData();

  // log all fields
  console.log([...body]);

  return json({
    // get a specific field's value
    name: body.get("name") ?? "world",
  });
}

/** @type {import('../../api/binance/$types').RequestHandler} */

/** @type {import('../../api/binance/$types').PageLoad} */
