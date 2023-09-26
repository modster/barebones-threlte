/**
 * loads 500 most recent uiklines from binance
 *
 */

const binanceUrl = "https://data-api.binance.vision/api/v3/";

/** @type {import("@sveltejs/kit").RequestHandler} */
export async function GET({ fetch, params }) {
	const res = await fetch(
		`${binanceUrl}uiKlines?symbol=${params.symbol}&interval=${params.interval}`
	);
	const item = await res.json();

	return new Response(item);
}
