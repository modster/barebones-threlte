<script>
  //src/routes/blog/[slug]/+page.svelte
  import { page } from "$app/stores";
  export let data;
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>

<h1>{data.post.title}</h1>

<div>{@html data.post.content}</div>

<pre>
  {JSON.stringify(data, null, 2)}
</pre>
