<script>
  import { page } from '$app/stores'
  export let data
</script>

<svelte:head>
  <title>{$page.data.title}</title>
</svelte:head>

<h1>{data.post.title}</h1>
