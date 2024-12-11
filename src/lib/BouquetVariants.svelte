<script>

  let { variantsData } = $props();
  import { slide } from 'svelte/transition';

</script>


  <div transition:slide style="float:left;background:white;margin: 8px;border-radius:32px;padding:24px;box-shadow: 0 16px 64px 8px #eddef5;border: solid 1px #a495ab;">
    Вариант: <span class="text-base font-bold text-pink-600">{variantsData[0]}</span><br>
    {#each variantsData[2] as i}
      <span class="font-bold text-sm">* {i[0]} x {i[1]}</span><br>
    {/each}
  </div>

