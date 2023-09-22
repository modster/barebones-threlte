<script lang="ts">
	import '../app.postcss';
	import { page } from '$app/stores';
	import { TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	// import { HorizontalSettings } from '$lib/HorizontalSettings';
	// import { width, height } from '$lib/hxw';
	import {
		AppShell,
		AppBar,
		Avatar,
		AppRail,
		AppRailTile,
		AppRailAnchor
	} from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	const tabSet: Writable<number> = writable(0);

	let currentTile: number = 0;
</script>

<AppShell
	slotSidebarLeft="bg-surface-500/5 w- m-0 p-0 bottom-0"
	slotSidebarRight="bg-surface-500/5 w-14 m-0 p-0"
	slotHeader=""
	slotFooter="bg-surface-500/5 h-13 m-0 p-0"
	scrollbarGutter=""
	slotPageHeader="bg-surface-500/5 h-8 m-0 p-0"
	slotPageContent=""
	regionPage=""
	slotPageFooter=""
>

	<!--
		Footer
	-->
	<svelte:fragment slot="footer">
		<TabGroup
			justify="justify-center"
			active="variant-ghost-primary"
			hover="hover:variant-soft-primary"
			flex="flex-none"
			spacing="space-x-1"
			padding="p-1"
			rounded=""
			border=""
			class="bg-surface-500/5"
		>
			<TabAnchor href="/" selected={$page.url.pathname === '/'}>
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
			</TabAnchor>
			<TabAnchor href="/charts" selected={$page.url.pathname === '/charts'}>
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
			</TabAnchor>
			<TabAnchor href="/threlte" selected={$page.url.pathname === '/threlte'}>
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
			</TabAnchor>
			<TabAnchor href="/about" selected={$page.url.pathname === '/about'}>
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
			</TabAnchor>
		</TabGroup>
	</svelte:fragment>

	<!--
		SideBar
		Left
	-->
	<svelte:fragment slot="sidebarLeft">
		<nav class="list-nav absolute bottom-8 m-0 p-0">
			<ul>
				<li><a href="/" aria-current={$page.url.pathname === '/'}>Home</a></li>
				<li><a href="/editor" aria-current={$page.url.pathname === '/editor'}>Editor</a></li>
			</ul>
		</nav>
	</svelte:fragment>

	<!--
		SideBar
		Right
	-->
	<svelte:fragment slot="sidebarRight" />
	<!--
	<svelte:fragment slot="footer">
		<AppBar background="bg-surface-400/5">
			<svelte:fragment slot="lead">
				<div class="absolute bottom-0 right-0 p-0 m-0">
					<span class="float-right m-0 p-0">
						<Avatar
							src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
							width="w-6"
							rounded="rounded-full"
						/>
					</span>
					<span class="float-left p-0.5i m-0.5 text-primary-300"> Greeffer </span>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">trail</svelte:fragment>
		</AppBar>
	</svelte:fragment> -->

	<!--
		Page
		Route
		Content
		-->
	<slot />
</AppShell>

<style lang="postcss">
</style>
