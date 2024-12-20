<script>
  let { variantsData } = $props();
  const toOptionalFixed = (num, digits) =>
  `${Number.parseFloat(num)}`;

  function getImgUrl() {
    console.log(variantsData.variant[3]);
    let resultImgUrl = variantsData.variant[3].replace('180x180','900x900');
    console.log(resultImgUrl);
    return resultImgUrl;
  };
</script>


  <div style="float:left;background:white;border: solid 1px #c9aeeb;margin: 8px;border-radius:20px;padding:16px;box-shadow: 4px 4px 16px 0 #d7cfe9;border:solid 1px #cdafe4">
    <div class="bouquetImgWrapper"><img src="{getImgUrl()}" alt="Фото" class="bouquetImg"></div>
    <span style="margin:8px -16px -16px;display:block;padding: 16px 16px 8px;border-bottom: dotted 4px #cdafe4"><span class="text-xl font-bold" style="color:#4c2282">{variantsData.variant[0]}</span></span><br>
    {#each variantsData.variant[2] as i}
      {#if variantsData.search == i[2]}
      <span style="color: #5f0092" class="text-lg text-pink-600 font-bold">👉 {i[0]}: <span class="font-bold">{toOptionalFixed(i[1],2)}</span></span><br>
      {:else}
      <span class="text-base">• {i[0]}: <span class="font-bold">{toOptionalFixed(i[1],2)}</span></span><br>
      {/if}
    {/each}
  </div>

