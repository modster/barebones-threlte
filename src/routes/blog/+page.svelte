<script>
  import { tocCrawler } from '@skeletonlabs/skeleton'
  import { posts } from './data'

  export let data
</script>

<svelte:head>
  <title>{data.test.title}</title>
</svelte:head>
<h1>{data.test.title}</h1>

<div use:tocCrawler={{ mode: 'generate' }}>
  <ul>
    {#each posts as { slug, title, content }}
      <li>
        <div class="card p-4 m-4">
          <h2 class="h2" id={slug}>{title}</h2>
          <!-- <p>{@html content}</p> -->
        </div>
      </li>
    {/each}
  </ul>
</div>
