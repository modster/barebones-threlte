<script lang="ts">
	// import { onMount } from 'svelte'
	import { T } from '@threlte/core';
	import { Align, Grid, OrbitControls } from '@threlte/extras';
	// import type { Contributions } from '$lib/types'

	// let contributions: Contributions[] = []

	// onMount(async () => {
	// 	const response = await fetch('https://gh-contributions-api.vercel.app/mattcroat/2022')
	// 	contributions = await response.json()
	// })
</script>

<Grid infiniteGrid sectionColor="#4a4b4a" sectionSize={20} cellSize={20} fadeDistance={400} />

<T.PerspectiveCamera makeDefault position={[50, 10, 10]} fov={60}>
	<OrbitControls enableDamping autoRotate={false} />
</T.PerspectiveCamera>

<T.AmbientLight color="#fff" intensity={0.4} />
<T.DirectionalLight position={[0, 200, 200]} intensity={2} color="#fff" />
<T.DirectionalLight position={[0, 200, -200]} color="#fff" intensity={2} />

<!-- <Align auto position.y={100}>
	{#each contributions as row, i}
		{#each row as day, j}
			{#if day}
				<T.Group position={[0, 0, 12 * i]}>
					<T.Mesh position={[12 * j, day.count / 2, 0]}>
						<T.BoxGeometry args={[10, day.count, 10]} />
						<T.MeshStandardMaterial color="#fff" />
					</T.Mesh>
				</T.Group>
			{/if}
		{/each}
	{/each}
</Align> -->
