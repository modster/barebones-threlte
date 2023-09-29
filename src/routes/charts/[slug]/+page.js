/**
 * loads 500 most recent uiklines from binance
 *
 */
const binanceUrl = "https://data-api.binance.vision/api/v3/";

export async function load({ fetch, params }) {
  /** @type {import('@sveltejs/kit').LoadEvent<params> */
  const res = await fetch(
    `${binanceUrl}uiKlines?symbol=${params.symbol}&interval=${params.interval}`
  );
  const item = await res.json();

  return { item };
}
