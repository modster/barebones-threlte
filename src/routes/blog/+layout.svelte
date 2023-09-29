<script>
  import { AppShell } from '@skeletonlabs/skeleton'
  import { TableOfContents } from '@skeletonlabs/skeleton'
  import '../../app.postcss'
  import 'iconify-icon'
  export let data
</script>

<!--
		SideBar
		Left
	-->
<AppShell slotSidebarLeft="w-auto">
  <svelte:fragment slot="sidebarLeft">
    <h1 class="h1">{data.test.title}</h1>
    <div class="card p-4 m-2">
      <TableOfContents class="sticky" />
    </div>
  </svelte:fragment>
  <slot />
</AppShell>
