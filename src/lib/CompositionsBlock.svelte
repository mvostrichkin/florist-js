<script>
  let { compositions } = $props();
</script>

<div>
  {#each compositions as flower}
    <a class="text-lg underline cursor-pointer" href="/flowers/{flower[0]}">{flower[1]}</a><br>
  {/each}
</div>
