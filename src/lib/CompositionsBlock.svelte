<script>
  let { compositions } = $props();
  console.log(compositions);
</script>

<div>
  {#each compositions as flower}
    <a href="/flowers/{flower[0]}">{flower[1]}</a><br>
  {/each}
</div>
