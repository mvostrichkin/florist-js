<script>
  let { variantsData } = $props();
  const toOptionalFixed = (num, digits) =>
  `${Number.parseFloat(num)}`;
</script>


  <div style="float:left;background:white;margin: 8px;border-radius:32px;padding:24px;box-shadow: 4px 8px 32px 0 #a899b2;">
    <span class="text-base">Вариант: </span>&nbsp;<span class="text-base font-bold text-pink-600">{variantsData[0]}</span><br>
    {#each variantsData[2] as i}
      <span class="text-base">- {i[0]}: <span class="font-bold">{toOptionalFixed(i[1],2)}</span></span><br>
    {/each}
  </div>

