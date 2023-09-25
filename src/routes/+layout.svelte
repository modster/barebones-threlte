<script>
	import '../app.postcss';
	import 'iconify-icon';
	import { page } from '$app/stores';
	import { LightSwitch, TabAnchor, TabGroup } from '@skeletonlabs/skeleton';
	import {
		AppShell,
		AppBar,
		Avatar,
		AppRail,
		AppRailTile,
		AppRailAnchor
	} from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { onMount } from 'svelte';
	import { footer } from '$lib/hxw';
	// AppRail store:
	const tabSet = writable(0);
	let currentTile = 0;

	/** @type {HTMLDivElement} */
	let foo;
	onMount(() => {
		console.log('footer.offsetHeight:', foo.offsetHeight);
		footer.set(foo.offsetHeight);
	});
</script>

<AppShell
	slotSidebarLeft="bg-surface-500/5 w-14 m-0 p-0 bottom-0"
	slotSidebarRight="bg-surface-500/5 w-14 m-0 p-0"
	slotFooter="bg-surface-500/5 h-8 w-full m-0 p-0"
	scrollbarGutter="auto"
>
	<!-- 
	slotPageHeader="bg-surface-500/5 h-8 m-0 p-0"
	slotPageContent="bg-surface-500/5 h-8 m-0 p-0"
	regionPage="bg-surface-500/5 h-8 m-0 p-0"
	slotPageFooter="bg-surface-500/5 h-8 m-0 p-0" -->

	<!--
		Footer
	-->
	<svelte:fragment slot="footer">
		<div bind:this={foo}>
			<TabGroup
				justify="justify-center"
				active="variant-ghost-primary"
				hover="hover:variant-soft-primary"
				flex="flex items-center w-10 h-10"
				spacing="space-x-0"
				padding="pb-1 mb-1"
				border="border-2 border-secondary-500"
				rounded="rounded-b-2xl"
			>
				<TabAnchor class="place-content-center" href="/" selected={$page.url.pathname === '/'}>
					<svelte:fragment slot="default">
						<iconify-icon icon="mdi:home" />
					</svelte:fragment>
				</TabAnchor>
				<TabAnchor
					class="place-content-center"
					href="/charts"
					selected={$page.url.pathname === '/charts'}
				>
					<svelte:fragment slot="default">
						<iconify-icon icon="mdi:chart-line" />
					</svelte:fragment>
				</TabAnchor>
				<TabAnchor
					class="place-content-center"
					href="/editor"
					selected={$page.url.pathname === '/editor'}
				>
					<svelte:fragment slot="default">
						<iconify-icon icon="iconamoon:3d-light" />
					</svelte:fragment>
				</TabAnchor>

				<TabAnchor
					class="place-content-center"
					href="/about"
					selected={$page.url.pathname === '/about'}
					regionTab="place-self-center"
				>
					<svelte:fragment slot="default">
						<iconify-icon icon="gg:profile" />
					</svelte:fragment>
				</TabAnchor>

				<!-- <TabAnchor class="place-content-center" title="toggle dark mode">
				<svelte:fragment>
					<div class="flex-initial justify-end pb-1 m-1">
					<LightSwitch />
					</div>
				</svelte:fragment>
			</TabAnchor> -->
			</TabGroup>
		</div>
	</svelte:fragment>

	<!--
		SideBar
		Left
	-->
	<!-- <svelte:fragment slot="sidebarLeft">
		<nav class="list-nav absolute bottom-8 m-0 p-0">
			<ul>
				<li><a href="/" aria-current={$page.url.pathname === '/'}>Home</a></li>
				<li><a href="/editor" aria-current={$page.url.pathname === '/editor'}>Editor</a></li>
			</ul>
		</nav>
	</svelte:fragment> -->

	<!--
		SideBar
		Right
	-->
	<!--
	<svelte:fragment slot="sidebarRight" />
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
