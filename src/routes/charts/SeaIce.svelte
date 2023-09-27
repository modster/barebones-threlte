<script>
	import { scaleLinear } from "d3-scale";
	import points from "./data.js";
	import { onMount } from "svelte";
	import { footer, pageFooter, widthOffset, heightOffset, height, width } from "$lib/screen.js";

	const yTicks = [0, 2, 4, 6, 8];
	const xTicks = [1980, 1990, 2000, 2010];
	const padding = { top: 16, right: 16, bottom: 16, left: 16 };

	/**
	 * @todo scroll-gutter
	 * type scrollY
	 */
	// let scrollYOffset;

	$: xScale = scaleLinear()
		.domain([minX, maxX])
		.range([padding.left, $width - padding.right]);
	$: yScale = scaleLinear()
		.domain([Math.min.apply(null, yTicks), Math.max.apply(null, yTicks)])
		.range([$height - padding.bottom, padding.top]);

	$: minX = points[0].x;
	$: maxX = points[points.length - 1].x;

	$: path = `M${points.map((p) => `${xScale(p.x)},${yScale(p.y)}`).join("L")}`;
	$: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;

	onMount(() => {
		function resize() {
			height.set(Math.floor($heightOffset - padding.top - padding.bottom - $footer));
			width.set($widthOffset - padding.left - padding.right);
		}
		window.addEventListener("resize", resize);
		resize();
		return () => {
			window.removeEventListener("resize", resize);
		};
	});

	/** @todo mobile screen sizes*/
	// /** @param {number} tick */
	// function formatMobile(tick) {
	// 	return "'" + tick.toString().slice(-2);
	// }
	function hello() {
		console.log("hello");
	}
</script>

<svelte:window bind:innerWidth={$widthOffset} bind:innerHeight={$heightOffset} />

<!-- x axis -->
<div class="p-4 pb-0 scroll-m-1 font-sans font-extralight text-sm text-[#888]">
	<svg width={$width} height={$height}>
		<!-- y axis -->
		<g>
			{#each yTicks as tick}
				<g class="tick tick-{tick}" transform="translate(0, {yScale(tick)})">
					<line x1="0" x2={$width} />
					<text y="-4" x="4">{tick} {tick === 8 ? " million sq km" : ""}</text>
				</g>
			{/each}
		</g>

		<!-- x axis -->
		<g>
			{#each xTicks as tick}
				<g class="tick tick-{tick}" transform="translate({xScale(tick)},{$height})">
					<line y1="0" y2="-{$height}" x1="0" x2="0" />
					<text y="-2" x="4">{tick}</text>
				</g>
			{/each}
		</g>

		<!-- data  -->
		<path class="path-area" d={area} />
		<path class="path-line" d={path} />
	</svg>
</div>

<style lang="postcss">
	.tick line {
		@apply stroke-2 stroke-[#888]/30;
		stroke-dasharray: 2;
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
