<script>
  let hex = (hex) => {
    hex.charCodeAt(0).toString(16);
  };
</script>

<input bind:value={hex} placeholder="enter a character" />
<p>{hex}!</p>
