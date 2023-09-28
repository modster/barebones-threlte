<script>
  let promise = getRandomNumber()

  async function getRandomNumber() {
    const res = await fetch(`/blog/`)
    const text = await res.text()
    if (res.ok) {
      return text
    } else {
      throw new Error(text)
    }
  }

  function handleClick() {
    promise = getRandomNumber()
  }
</script>

<button on:click={handleClick}> generate random number </button>

{#await promise}
  <p>...waiting</p>
{:then number}
  <p>{@html number}</p>
{:catch error}
  <p style="color: red">{error.message}</p>
{/await}
