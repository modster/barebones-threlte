<script>
  import { page } from "$app/stores";
  export let data;
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>

<svelte:component this={data.component} />

<pre>
  {JSON.stringify($page, null, 2)}
</pre>
