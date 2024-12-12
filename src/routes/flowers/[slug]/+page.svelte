<script>
    import Bouquet from '$lib/Bouquet.svelte';
    let { data } = $props();
    let dataLength = data.bouquets.items.length;
  </script>
  
  <div style="margin:16px;">
    <span style="font-size:1rem;line-height:1.5rem">Последнее обновление базы: <span class="font-bold">{ data.lastUpdated }</span></span><br><span style="font-size:1rem;line-height:1.5rem">Всего букетов на сайте: <span class="font-bold">{ data.bouquetsQty }</span></span><br><a href="/api/update" style="">
      <b style="color: white;background: linear-gradient(180deg, #f2a3c1, #b100ff);border-radius: 20px;box-shadow: 8px 8px 32px 0 #beace5;padding: 8px 16px;height:40px;margin: 8px 0 8px 0;display: inline-block;">💫 Обновить</b></a><a href="/flowers" class="font-bold" style="border-radius:20px;height:20px;border:solid 1px #4c2282;padding: 8px 16px;color: #4c2282;margin-left:16px">🔍 Искать</a>
    <h1 class="text-3xl font-bold mt-3" style="color:#4c2282">{data.bouquets.flowerName}</h1><h2 class="text-lg">Позиций: <b>{dataLength}</b></h2><br>
    <div class="">
      {#each data.bouquets.items as item}
        <Bouquet bouquetData={{item: item, id: data.bouquets.flowerID}}></Bouquet>
      {/each}
    </div>
  </div>
  