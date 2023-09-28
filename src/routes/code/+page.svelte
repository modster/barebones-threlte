<script>
  import { page } from "$app/stores";
</script>

<svelte:head>
  {$page.data.title}
</svelte:head>
<h1 class="h1">code</h1>
<pre>
    {JSON.stringify($page, null, 2)}
</pre>
