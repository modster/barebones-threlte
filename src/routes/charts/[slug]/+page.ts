import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	const res = await fetch(
		`https://data-api.binance.vision/api/v3/uiKlines?symbol=${params.symbol}&interval=${params.interval}`
	);
	const item = await res.json();

	return { item };
};
