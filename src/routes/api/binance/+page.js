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
 *
 * @type {import('./$types').PageLoad}
 *
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
export async function load({ fetch, params }) {
	/** @todo: URLSearchParams */
	const binanceUrl = new URL(
		`https://data-api.binance.vision/api/v3/uiKlines?symbol=${params.symbol}&interval=${params.interval}&limit=${params?.limit}`
	);

	const response = await fetch(binanceUrl)
		.then((r) => r.text())
		.catch((e) => console.log(e));

	// must be object
	return {
		response
	};
}
