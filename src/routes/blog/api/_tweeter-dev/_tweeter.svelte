<script>
  import { FileDropzone } from '@skeletonlabs/skeleton'

  // handler
  function onChangeHandler(event) {
    return JSON.stringify(event, null, 2)
  }

  // tweeter
  async function tweeter(event) {
    const form = event.target
    const data = new FormData(form)

    await fetch('/api/tweeter', {
      method: 'POST',
      body: data,
    })
  }
</script>

<button
  type="button"
  class="btn bg-gradient-to-br variant-gradient-tertiary-primary"
>
  <span>(icon)</span>
  <span>
    <a class="block card card-hover p-4" href="/elements/cards">Hover Me!</a>
  </span>
</button>

<button
  type="button"
  class="btn bg-gradient-to-br variant-gradient-tertiary-primary"
>
  <span>(icon)</span>
  <span>
    <button
      type="button"
      class="btn-icon bg-gradient-to-br variant-gradient-tertiary-primary"
      >(icon)</button
    >
    <button
      type="button"
      class="btn bg-gradient-to-br variant-gradient-tertiary-primary"
      >Button</button
    >
  </span>
</button>

<div class="card">
  <button
    type="button"
    class="btn-icon bg-gradient-to-br variant-gradient-tertiary-primary"
    >(icon)
  </button>

  <button
    type="button"
    class="btn bg-gradient-to-br variant-gradient-tertiary-primary"
  >
    Button
  </button>

  <button
    type="button"
    class="btn bg-gradient-to-br variant-gradient-tertiary-primary"
  >
    <span>(icon)</span>
    <span>Button</span>
  </button>
</div>

/** .card - Adds basic card styling to any block element. .card-header - The
header region of the card. .card-footer - The footer region of the card.
.card-hover - Provides an animated hover effect. .variant-glass-[color] primary
| secondary | tertiary | success | warning | error | surface A semi-transparent
glass variation. Keys Values Description .btn - Creates a text button using a
button or anchor. .btn-icon - Creates a text icon button using a button or
anchor. .btn-[value] sm | md | lg | xl Canned button sizes that define padding
and text sizes. .btn-icon-[value] sm | md | lg | xl Canned icon button sizes
that define padding and text sizes. */ */
