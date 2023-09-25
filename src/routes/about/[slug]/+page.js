/**
 *
 *
 */

const binanceUrl = 'https://data-api.binance.vision/api/v3/';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params }) {
	const res = await fetch(`uiKlines?symbol=${params.symbol}&interval=${params.interval}`);
	const item = await res.json();

	return { item };
}
