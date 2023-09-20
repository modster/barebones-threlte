<script lang="ts">
	import '../app.postcss';
	import { width, height } from '$lib/hxw';
	import {
		AppShell,
		AppBar,
		Avatar,
		AppRail,
		AppRailTile,
		AppRailAnchor
	} from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	let currentTile: number = 0;
</script>

<AppShell
	slotSidebarLeft="bg-surface-500/5 w-20 m-0 p-0 bottom-0"
	slotSidebarRight="bg-surface-500/5 m-0 p-0"
>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-500/5 h-8 m-0 p-0">
			<svelte:fragment slot="lead">
				// @todo: crooked
				<strong class="bg-inherit text-secondary-500 text-clip capitalize">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm bg-gradient-to-br variant-gradient-tertiary-secondary"
					href="https://twitter.com/goodgreeff"
					target="_blank"
					rel="noreferrer"
				>
					Twitter
				</a>
				/** * @TODOCS * Setup og imagery & sharing */
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

	<!--
		<svelte:fragment slot="pageHeader">
		<AppBar>
			<svelte:fragment slot="lead">(icon)</svelte:fragment>
			<svelte:fragment slot="trail">(actions)</svelte:fragment>
			<svelte:fragment slot="headline">(headline)</svelte:fragment>
		</AppBar>
		</svelte:fragment>
		-->

	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav absolute bottom-8 px-0 mx-1 my-0 py-0">
			<ul>
				<li><a href="/" aria-current={$page.url.pathname === '/'}>Home</a></li>
				<li><a href="/editor" aria-current={$page.url.pathname === '/editor'}>Editor</a></li>
			</ul>
		</nav>
	</svelte:fragment>

	<svelte:fragment slot="sidebarRight">
		<AppRail background="bg-surface-500/5">
			<svelte:fragment slot="lead">
				<AppRailAnchor background="bg-inherit" href="/" selected={$page.url.pathname === '/'}
					>(icon)</AppRailAnchor
				>
			</svelte:fragment>
			<!-- --- -->
			<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Tile 1</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Tile 2</span>
			</AppRailTile>
			<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
				<svelte:fragment slot="lead">(icon)</svelte:fragment>
				<span>Tile 3</span>
			</AppRailTile>
			<!-- --- -->
			<svelte:fragment slot="trail">
				<AppRailAnchor href="/" target="_blank" title="Account">(icon)</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

	<!--
		<svelte:fragment slot="pageFooter">
	-->

	<svelte:fragment slot="footer">
		<AppBar background="bg-surface-400/5">
			<svelte:fragment slot="lead">
				<div class="absolute bottom-0 right-0 max-h-8 p-0 m-0">
					<span class="float-right m-0 p-1">
						<Avatar
							src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
							width="w-6"
							rounded="rounded-full"
						/>
					</span>
					<span class="float-left p-0.5i m-0.5 text-primary-300">
						&copy2023 DataDrivenSoftware
					</span>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail" />
		</AppBar>
	</svelte:fragment>

	<!--
		Page
		Route
		Content
		-->

	<slot />
</AppShell>
