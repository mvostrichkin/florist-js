<script>
  let open = $state(false);
  import BouquetVariants from '$lib/BouquetVariants.svelte';
    import { cubicInOut } from 'svelte/easing';
  let {bouquetData} = $props();
  import { fly } from 'svelte/transition';
  const handleClick = () => open = !open;
</script>

<div style="display:inline-block;width:100%;">
  <a href="https://www.florist.ru/bouquet-{bouquetData[1]}"><span style="display:inline;" class="text-lg text-violet-900 underline">{bouquetData[1]}</span></a><span onclick={handleClick} class="text-lg">&nbsp;<span class="underline decoration-dotted cursor-pointer">{bouquetData[0]}</span></span>
  <br>
  {#if open}
  <div transition:fly={{duration:150}} style="display:inline-block">
  {#each bouquetData[2] as variant}
    <BouquetVariants variantsData={variant}></BouquetVariants>
  {/each}
  </div>
  {/if}
</div>
