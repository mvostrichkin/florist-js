<script>
    import Bouquet from '$lib/Bouquet.svelte';
    let { data } = $props();
    let dataLength = data.bouquets.items.length;
  </script>
  
  <div style="margin:16px;">
    <h1>Последнее обновление базы: <span class="font-bold">{ data.lastUpdated }</span></h1><h2>Всего букетов на сайте: <span class="font-bold">{ data.bouquetsQty }</span></h2> <a href="/api/update" style="">
      <b style="color: white;
      background: linear-gradient(180deg, #e76fd2, #8e00db);
      border-radius: 16px;
      box-shadow: 4px 8px 32px 0 #a899b2;
      padding: 8px;
      margin: 8px 0 8px 0;
      display: inline-block;">🔄 Обновить</b></a><a href="/flowers" class="font-bold" style="border-radius:16px;border:solid 1px #8e00db;padding: 8px;color: #8e00db;margin-left:16px">🔍 Поиск по составу</a>
    <h1 class="text-3xl font-medium">{data.bouquets.flowerName}</h1><h2 class="text-xl">Позиций: {dataLength}</h2><br>
    <div class="font-sans">
      {#each data.bouquets.items as item}
        <Bouquet bouquetData={{item: item, id: data.bouquets.flowerID}}></Bouquet>
      {/each}
    </div>
  </div>
  