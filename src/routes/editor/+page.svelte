<script lang="ts">
	import { Canvas } from "@threlte/core";
	import { Theatre } from "@threlte/theatre";
	import { writable } from "svelte/store";
	import Scene from "./Text.svelte";
	export let text = writable("text");
	export let fontSize = writable(1);
</script>

<!-- <div use:action /> -->
<div class="relative h-full w-full bg-orange-500/20">
	<Canvas>
		<Scene text={$text} fontSize={$fontSize} />
	</Canvas>
</div>
<!-- 
<Canvas>
	<Theatre>
		<Scene />
	</Theatre>
</Canvas> -->
