<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Theatre } from '@threlte/theatre'
  import Fallback from '../fallback.svelte'

  export let data
  let text = 'hello world'
  let fontSize = 1
</script>

<!-- <div use:action /> -->
<div class="relative h-full w-full">
  <Canvas>
    <Theatre>
      <Fallback />
      <!-- loading...
      <svelte:component this={data.post.component} {text} {fontSize} /> -->
    </Theatre>
  </Canvas>
</div>
