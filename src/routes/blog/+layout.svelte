<script>
  import { AppBar } from "@skeletonlabs/skeleton";
  import { page } from "$app/stores";
</script>

<!--
		SideBar
		Left
	-->

<AppBar slotSidebarLeft="bg-surface-500/5 w-14 m-0 p-0 bottom-0">
  <svelte:fragment slot="sidebarLeft">
    <nav class="list-nav absolute bottom-8 m-0 p-0">
      <ul>
        <li>
          <a href="/" aria-current={$page.url.pathname === "/"}>Home</a>
        </li>
        <li>
          <a href="/blog" aria-current={$page.url.pathname === "/blog"}
            >Editor</a
          >
        </li>
      </ul>
    </nav>
  </svelte:fragment>
  <slot />
</AppBar>
