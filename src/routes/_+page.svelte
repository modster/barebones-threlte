<script>
	import LinePlot from '$lib/ddd/LinePlot.svelte';
	import * as d3 from 'd3';
	import { onMount } from 'svelte';
	import { width, height } from '$lib/hxw';

	let data = d3.ticks(-2, 2, 200).map(Math.sin);

	function onMousemove(event) {
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
</script>

<!-- <svelte:window bind:innerWidth={w} bind:innerHeight={h} /> -->

<!-- HERO
  gradient
  mesh
  background
-->
<div class="hero">
	<h1 class="h1">Skeleton H1</h1>
	<h1>Design</h1>
	<h1>Build</h1>
	<h1>Deploy</h1>
</div>

<!-- Paralax
  Fixed/static
  Background
  Space
  Stars
-->

<!--
  What is this?
  What do we do?
  What is it good for?
  What's so great about it?
  How much does it cost?
  '
-->
<h1 class="h1">
	<span
		class="bg-gradient-to-br from-blue-500 to-cyan-300 bg-clip-text text-transparent box-decoration-clone"
		>Design.</span
	>
</h1>
<h1 class="h1">
	<span
		class="bg-gradient-to-br from-red-500 to-yellow-500 bg-clip-text text-transparent box-decoration-clone"
		>Build.</span
	>
</h1>
<h1 class="h1">
	<span
		class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone"
		>Deploy.</span
	>
</h1>
<!-- CALL TO ACTION
  todo
-->
<h1 class="h1"><span class="gradient-heading">Skeleton</span></h1>
