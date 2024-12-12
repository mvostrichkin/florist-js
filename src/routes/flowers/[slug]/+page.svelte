<script>
    import Bouquet from '$lib/Bouquet.svelte';
    let { data } = $props();
    let dataLength = data.bouquets.items.length;
  </script>
  
  <div style="margin:16px;">
      <h1>Обновлено: <span class="font-bold">{ data.lastUpdated }</span></h1><h2>Позиций: <span class="font-bold">{ data.bouquetsQty }</span></h2> <a href="/api/update" style=""><b style="color: white;
      background: linear-gradient(180deg, #e76fd2, #8e00db);
      border-radius: 16px;
      box-shadow: 4px 8px 32px 0 #a899b2;
      padding: 8px;
      margin: 8px 0 8px 0;
      display: inline-block;">Обновить</b></a>
    <h1 class="text-2xl font-bold">{data.bouquets.flowerName}</h1><h2 class="text-xl">Позиций: {dataLength}</h2><br>
    <div class="font-sans">
      {#each data.bouquets.items as item}
        <Bouquet bouquetData={item}></Bouquet>
      {/each}
    </div>
  </div>
  