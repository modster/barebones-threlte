<script lang="ts">
	import LinePlot from '$lib/ddd/LinePlot.svelte';
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { width, height } from '$lib/hxw';
	import * as Plot from '@observablehq/plot';

	let data = d3.ticks(-2, 2, 200).map(Math.sin);

	function onMousemove(event: any) {
		const [x, y] = d3.pointer(event);
		data = data.slice(-200).concat(Math.atan2(x, y));
	}

	onMount(() => {
		function resize() {
			width.set(window.innerWidth);
			height.set(window.innerHeight);
		}

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
	let json = [];

	// onMount(async () => {
	// 	const res = await fetch(`/tutorial/api/album`);
	// 	photos = await res.json();
	// });
	async function plotCandles(aapl: string[]):Promise<SVGSVGElement | HTMLElement>{
		return await Plot.plot({
			inset: 6,
			width: 960,
			y: {
				label: '↑ Apple stock price ($)'
			},
			marks: [
				Plot.ruleY(
					aapl,
					Plot.selectFirst({
						y: (d) => d.Open,
						stroke: 'grey',
						strokeDasharray: '3,2'
					})
				),
				Plot.ruleX(aapl, {
					x: 'Date',
					y1: 'Low',
					y2: 'High'
				}),
				Plot.ruleX(aapl, {
					x: 'Date',
					y1: 'Open',
					y2: 'Close',
					stroke: (d) => Math.sign(d.Close - d.Open),
					strokeWidth: 4,
					strokeLinecap: 'round'
				})
			]
		});
	}
	
	async function binanceDataAPI() {
		/** @type import('d3-fetch').Request ; */
		const res = d3.json(
			'https://data-api.binance.vision/api/v3/uiKlines?symbol=ETHBTC&interval=1m'
		);

		if (!res) {
			throw new Error(res);
		}
		return {
			plotCandles(res)
		}
	}
	
	onMount(async () => {
		await binanceDataAPI();
	});
</script>

{#await binanceDataAPI()}
	<p>...waiting</p>
{:then candles}
	{candles}
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
