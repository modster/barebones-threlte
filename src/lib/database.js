/**
 * @function load
 *
 * @file          routes/api/[slug]/+page.js @todo rename/relocate
 * @description   Fetches up to 1000 candlestick bars of a given asset from binance api. No auth necessary
 * @prop {URL}    binanceUrl - https://data-api.binance.vision/
 * @prop {string} symbol     - trading pair. example: BTCUSDT, ETHBTC, ETHUSDT
 * @prop {string} interval   - time frame. example: '1m' for 1 minute, '1D' for daily, '1h' for hourly
 * @prop {number} limit      - request up to 1000 bars, default 500, optional
 * @prop {Date}   starTime   - UNIX style, optional
 * @prop {Date}   Endtime    - UNIX style, optional
 * @example: GET <binanceUrl>api/v3/uiKlines?symbol=BTCUSDT&interval=1m&limit=60
 * returns data in this shape:
 *
 * ```js
 * [
 *   [
 *       1695699420000,	   // start time
 *       "26390.01000000", // open
 *       "26390.01000000", // high
 *       "26386.51000000", // low
 *       "26386.51000000", // close
 *       "11.76285000",    // volume
 *       1695699479999,    // close time
 *       "310410.46902630",// @todo
 *       338,              // @todo
 *       "0.31089000",     // @todo
 *       "8204.17911390",  // @todo
 *       "0"               // not used
 *   ],
 * ]
 *
 * ```
 */

import { error, json } from "@sveltejs/kit";

/** @type {Page} */
export async function GET({ url }) {
  const aUrl = "https://data-api.binance.vision/";
  const path = "api/v3/ticker/price?";
  const symbol = url.searchParams.get("symbol") ?? "BTCUSDT";

  const binanceUrl = new URL(`${aUrl}${path}symbol=${symbol}`);
  console.log(binanceUrl);

  const response = await fetch(binanceUrl)
    .then((r) => r.json())
    .catch((e) => console.log(error(e)));

  return new Response(response);
}

/**
 * @function formData
 * @description handler for form data
 *
 */
/** @type import('../routes/blog/$types').RequestHandler */
export async function POST(event) {
  const body = await event.request.formData();

  // log all fields
  console.log([...body]);

  return json({
    // get a specific field's value
    name: body.get("name") ?? "world",
  });
}
