<script>
  let { compositions } = $props();
  let lastFlowerName;
  let character;

  function checkIfSpaceNeeded(flowerName) {
    if (lastFlowerName == null) {
      lastFlowerName = flowerName;
      return false;
    }

    if (character == null) {
      character = flowerName.charAt(0);
    }

    if (lastFlowerName.charAt(0) !== flowerName.charAt(0)) {
      lastFlowerName = flowerName;
      character = lastFlowerName.charAt(0);
      return true;
    }
  }
</script>

<div>
  <h2 class="text-5xl font-bold mt-3" style="color:#4c2282">{compositions[0][1].charAt(0)}</h2>
  {#each compositions as flower}
    {#if (checkIfSpaceNeeded(flower[1]))}
      <br>
      <h2 class="text-5xl font-bold" style="color:#4c2282">{character}</h2>
    {/if}
    <a class="text-lg cursor-pointer" href="/flowers/{flower[0]}">{flower[1]}</a><br>
  {/each}
</div>
