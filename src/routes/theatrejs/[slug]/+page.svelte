<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Theatre } from '@threlte/theatre'
  import fallback from '../fallback.svelte'

  export let data
  let text = data.slug.title
  let fontSize = 1
</script>

<!-- <div use:action /> -->
<div class="card">
  <!-- <Canvas>
    <Theatre> -->
  <!-- loading... -->
  <svelte:component this={fallback} {text} {fontSize} />
  <!-- <Scene {text} {fontSize} /> -->
  <!-- </Canvas>-->
</div>
