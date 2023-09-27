<script>
	import LinePlot from "$lib/ddd/LinePlot.svelte";
	import * as d3 from "d3";
	import { onMount } from "svelte";
	import { width, height } from "$lib/screen";

	let data = d3.ticks(-2, 2, 200).map(Math.sin);

	/**
	 * @param {any} event
	 */
	function onMousemove(event) {
		const [x, y] = d3.pointer(event);
		data = data.slice(-200).concat(Math.atan2(x, y));
	}

	onMount(() => {
		function resize() {
			width.set(window.innerWidth);
			height.set(window.innerHeight);
		}

		window.addEventListener("resize", resize);
		resize();

		return () => {
			window.removeEventListener("resize", resize);
		};
	});
</script>

<!-- <svelte:window bind:innerWidth={w} bind:innerHeight={h} /> -->

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div on:mousemove={onMousemove}>
	<LinePlot {data} />
</div>
