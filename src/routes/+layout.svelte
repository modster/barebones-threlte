<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	export let data;
</script>

<!-- App Shell -->
<AppShell slotSidebarLeft="bg-surface-500/5 max-w-md p-4">
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-500/5">
			<svelte:fragment slot="lead">
				<strong class="text-xl capitalize">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm bg-gradient-to-br variant-gradient-tertiary-secondary"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/modster/barebones-threlte"
					target="_blank"
					rel="noreferrer"
				>
					{`</>`}
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<svelte:fragment slot="pageHeader">
		<!-- <AppBar>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
			<svelte:fragment slot="headline">(headline)</svelte:fragment>
		</AppBar> -->
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<!-- Insert the list: -->
		<nav class="list-nav">
			<ul>
				<li><a href="/">Home</a></li>
				<li><a href="/about">About</a></li>
				<li><a href="/charts">Charts</a></li>
				<li><a href="/editor">Editor</a></li>
			</ul>
		</nav>
		<!-- --- -->
	</svelte:fragment>
	<!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
	<svelte:fragment slot="pageFooter">
		<!-- App Bar -->
		<AppBar background="bg-surface-500/5">
			<svelte:fragment slot="lead">
				<strong class="text-xl capitalize">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm bg-gradient-to-br variant-gradient-tertiary-secondary"
					href="https://twitter.com/SkeletonUI"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/modster/barebones-threlte"
					target="_blank"
					rel="noreferrer"
				>
					{`</>`}
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="footer">Footer</svelte:fragment>

	<!-- Page Route Content -->
	<slot />
</AppShell>
