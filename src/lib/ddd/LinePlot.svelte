<script>
	import * as d3 from "d3";
	import { width, height } from "$lib/hxw";

	/**
	 * @type {string | any[] | Iterable<d3.NumberValue> | Iterable<string>}
	 */
	export let data;

	let header = 32;
	let footer = 32;
	let rightSideBar = 0;
	let leftSideBar = 0;

	export let marginTop = 20; // + header;
	export let marginRight = 20; // + rightSidebar;
	export let marginBottom = 30; // - footer - header;
	export let marginLeft = 40; // + leftSideBar;
	/**
	 * @type {SVGGElement}
	 */
	let gx;
	/**
	 * @type {import('d3/axis')}
	 */
	let gy;
	$: x = d3.scaleLinear(
		[0, data.length - 1],
		[marginLeft, $width - marginRight - rightSideBar - leftSideBar]
	);
	$: y = d3.scaleLinear(d3.extent(data), [$height - marginBottom - footer - header, marginTop]);
	$: line = d3.line((d, i) => x(i), y);
	$: d3.select(gy).call(d3.axisLeft(y));
	$: d3.select(gx).call(d3.axisBottom(x));
</script>

<svg width={$width - leftSideBar} height={$height - footer - header}>
	<g bind:this={gx} transform="translate(0,{$height - marginBottom - footer - header})" />
	<g bind:this={gy} transform="translate({marginLeft},0)" />
	<path fill="none" stroke="currentColor" stroke-width="1.5" d={line(data)} />
	<g fill="white" stroke="currentColor" stroke-width="1.5">
		{#each data as d, i}
			<circle key={i} cx={x(i)} cy={y(d)} r="2.5" fill="white" />
		{/each}
	</g>
</svg>

<style type="postcss">
</style>
