<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Theatre } from '@threlte/theatre'
  import Scene from './text.svelte'
  export let data
  let text = 'hello world'
  let fontSize = 1
  // let promise = data.post.component
</script>

<!-- <div use:action /> -->
<div class="relative h-full w-full">
  <Canvas>
    <Theatre>
      <Scene {text} {fontSize} />
    </Theatre>
  </Canvas>
</div>
