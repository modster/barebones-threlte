<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import { HorizontalSettings } from '$lib/HorizontalSettings';
	import { width, height } from '$lib/hxw';
	import {
		AppShell,
		AppBar,
		Avatar,
		AppRail,
		AppRailTile,
		AppRailAnchor
	} from '@skeletonlabs/skeleton';
	import postcss from 'postcss';

	let currentTile: number = 0;
</script>

<AppShell
	slotSidebarLeft="bg-surface-500/5 w-20 m-0 p-0 bottom-0"
	slotSidebarRight="bg-surface-500/5 m-0 p-0"
>
	<svelte:fragment slot="header">
		<AppBar background="bg-surface-500/5 h-8 m-0 p-0">
			<svelte:fragment slot="lead">
				<!-- // @todo: crooked -->
				<strong class="bg-inherit text-secondary-500 text-clip capitalize">Skeleton</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<TabGroup>
					<TabAnchor href="/" selected={$page.url.pathname === '/'}>Home</TabAnchor>
					<TabAnchor href="/about" selected={$page.url.pathname === '/about'}>About</TabAnchor>
				</TabGroup>
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
	<!--
		SideBar
		Right
		AppRail
	-->
	<svelte:fragment slot="sidebarRight">
		<AppRail
			background="bg-surface-500/5"
			spacing="space-y-0"
			width="w-12"
			active="bg-secondary-200/20"
			hover="bg-tertiary-hover-token"
		>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
						/>
					</svg></AppRailAnchor
				>
			</svelte:fragment>

			<AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
				<svelte:fragment slot="default">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
						/>
					</svg>
				</svelte:fragment>
			</AppRailTile>

			<AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
				<svelte:fragment slot="lead">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
						/>
					</svg>
				</svelte:fragment>
			</AppRailTile>

			<AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
				<svelte:fragment slot="lead">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							fill-rule="evenodd"
							d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
							clip-rule="evenodd"
						/>
					</svg>
				</svelte:fragment>
			</AppRailTile>

			<AppRailTile bind:group={currentTile} name="tile-4" value={3} title="tile-4">
				<svelte:fragment slot="lead">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 20 20"
						fill="currentColor"
						class="w-5 h-5"
					>
						<path
							fill-rule="evenodd"
							d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z"
							clip-rule="evenodd"
						/>
					</svg>
				</svelte:fragment>
			</AppRailTile>

			<!-- <AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-4">
				<svelte:fragment slot="lead">
					<a
						class="btn btn-sm variant-ghost-surface"
						href="https://github.com/modster/barebones-threlte"
						target="_blank"
						rel="noreferrer"
					>
						{`</>`}
					</a>
				</svelte:fragment>
				<span>Tile 4</span>
			</AppRailTile> -->

			<svelte:fragment slot="trail">
				<AppRailAnchor href="https://twitter.com/goodgreeff" target="_blank" title="twitter">
					icon
				</AppRailAnchor>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>

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
					<span class="float-left p-0.5i m-0.5 text-primary-300"> Greeffer </span>
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

<style lang="postcss">
</style>
