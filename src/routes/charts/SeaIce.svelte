<script>
	import { scaleLinear } from 'd3-scale';
	import { get } from 'svelte/store';
	import points from './data.js';
	import { onMount } from 'svelte';
	import { width, height, footer } from '$lib/hxw.js';

	const yTicks = [0, 2, 4, 6, 8];
	const xTicks = [1980, 1990, 2000, 2010];
	const padding = { top: 0, right: 0, bottom: 0, left: 0 };

	$: xScale = scaleLinear().domain([minX, maxX]).range([0, $width]);

	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([$height, 0]);

	$: minX = points[0].x;
	$: maxX = points[points.length - 1].x;
	$: path = `M${points.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
	$: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;

	// /** @param {number} tick */
	// function formatMobile(tick) {
	// 	return "'" + tick.toString().slice(-2);
	// }
	onMount(() => {
		function resize() {
			height.set(window.innerHeight - $footer);
			width.set(window.innerWidth);
			console.log($footer, window.innerHeight);
		}

		window.addEventListener('resize', resize);
		resize();

		return () => {
			window.removeEventListener('resize', resize);
		};
	});
</script>

<!-- <h2 class="h2">Arctic sea ice minimum</h2> -->
<div class="">
	<!-- x axis -->
	<svg width={$width} height={$height}>
		<!-- y axis -->
		<g>
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x1="0" x2={$width} />
					<text y="-4">{tick} {tick === 8 ? ' million sq km' : ''}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g>
			{#each xTicks as tick}
				<g class="tick tick-{tick}" transform="translate({xScale(tick)},{$height})">
					<line y1="0" y2="-{$height}" x1="0" x2="0" />
					<text y="-4">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- data -->
		<path class="path-area" d={area} />
		<path class="path-line" d={path} />
	</svg>
</div>

<style lang="postcss">
	.tick {
		@apply font-sans font-extralight text-sm;
	}

	.tick line {
		@apply stroke-2 stroke-slate-500;
		/* stroke: #888; */
		/* stroke-dasharray: 2; */
	}

	.tick text {
		fill: #888;
		text-anchor: start;
	}

	.tick.tick-0 line {
		stroke-dasharray: 0;
	}

	.x-axis .tick text {
		text-anchor: middle;
	}

	.path-line {
		fill: none;
		stroke: rgb(0, 100, 100);
		stroke-linejoin: round;
		stroke-linecap: round;
		stroke-width: 2;
	}

	.path-area {
		fill: rgba(0, 100, 100, 0.2);
	}
</style>
