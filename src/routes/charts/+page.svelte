<script>
	import Chart from "./SeaIce.svelte";
	import { config } from "$lib/localStorageStoreExample";
	import { footer } from "$lib/screen";
	import { writable } from "svelte/store";
	export let width;
	export let height;
</script>

<div bind:offsetWidth={width} bind:offsetHeight={height}>
	<Chart {width} {height} />
</div>
