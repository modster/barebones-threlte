<script>
  import '../app.postcss'
  import 'iconify-icon'
  import { page } from '$app/stores'
  import { AppShell, TabAnchor, TabGroup } from '@skeletonlabs/skeleton'
  import { onMount } from 'svelte'
  import { footer } from '$lib/screen'

  /** @type {HTMLDivElement} */
  let foot
  onMount(() => {
    footer.set(foot.clientHeight)
  })
</script>

<svelte:head>
  <title>{$page.url.pathname.slice(1)}</title>
</svelte:head>

<AppShell
  slotFooter="bg-surface-500/5 h-8 w-full m-0 p-0"
  slotSidebarLeft="w-auto bg-surface-500/5 w-14 m-0 p-0"
  scrollbarGutter="auto"
>
  <!--
		Footer
	-->
  <svelte:fragment slot="footer">
    <div bind:this={foot}>
      <TabGroup
        justify="justify-center"
        active="variant-ghost-primary"
        hover="hover:variant-soft-primary"
        flex="flex items-center w-8 h-8"
        spacing="space-x-0"
        padding="pb-0 mb-0"
        border="box-border border- border-secondary-500"
      >
        <!--
          Home
        -->
        <TabAnchor
          class="place-content-center"
          href="/"
          selected={$page.url.pathname === '/'}
        >
          <svelte:fragment slot="default">
            <iconify-icon icon="mdi:home" />
          </svelte:fragment>
        </TabAnchor>

        <!--
          Charts
      	-->
        <TabAnchor
          class="place-content-center"
          href="/charts"
          selected={$page.url.pathname === '/charts'}
        >
          <svelte:fragment slot="default">
            <iconify-icon icon="mdi:chart-line" />
          </svelte:fragment>
        </TabAnchor>

        <!--
          Code        
        -->
        <TabAnchor
          class="place-content-center"
          href="/code"
          selected={$page.url.pathname === '/code'}
        >
          <svelte:fragment slot="default">
            <iconify-icon
              icon="eos-icons:code-deploy-outlined"
              class="iconify"
            />
          </svelte:fragment>
        </TabAnchor>

        <!--
          Theatrejs
        -->
        <TabAnchor
          class="place-content-center"
          href="/theatrejs"
          selected={$page.url.pathname === '/theatrejs'}
        >
          <svelte:fragment slot="default">
            <iconify-icon icon="tabler:brand-threejs" class="iconify" />
          </svelte:fragment>
        </TabAnchor>

        <!--
          Blog
        -->
        <TabAnchor
          class="place-content-center"
          href="/blog"
          selected={$page.url.pathname === '/blog'}
        >
          <svelte:fragment slot="default">
            <iconify-icon icon="iconoir:design-pencil" class="iconify" />
          </svelte:fragment>
        </TabAnchor>
        <!--
          Aboot
        -->
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
