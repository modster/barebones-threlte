<script lang="ts">
  import { Canvas } from "@threlte/core";
  import { Theatre } from "@threlte/theatre";
  import Scene from "./text.svelte";
  let text = "text";
  let fontSize = 1;
</script>

<!-- <div use:action /> -->
<div class="relative h-full w-full">
  <Canvas>
    <Theatre>
      <svelte:component this={Scene} {text} {fontSize} />
    </Theatre>
  </Canvas>
</div>
