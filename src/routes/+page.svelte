<script>
  import Bouquet from '$lib/Bouquet.svelte';
  let { data } = $props();
  let dataLength = data.bouquets.items.length;
</script>

<div style="margin:16px;">
	<h1>Последнее обновление базы: <span class="font-bold">{ data.lastUpdated }</span></h1><h2>Всего букетов на сайте: <span class="font-bold">{ data.bouquetsQty }</span></h2> <a href="/api/update" style="">
    <b style="color: white;background: linear-gradient(180deg, #f2a3c1, #b100ff);border-radius: 20px;box-shadow: 8px 8px 32px 0 #beace5;padding: 8px 16px;height:40px;margin: 8px 0 8px 0;display: inline-block;">🔄 Обновить</b></a><a href="/flowers" class="font-bold" style="border-radius:20px;height:20px;border:solid 1px #4c2282;padding: 8px 16px;color: #4c2282;margin-left:16px">🔍 Искать</a>
  <div class="mt-3">
    {#each data.bouquets.items as item}
      <Bouquet bouquetData={{item:item}}></Bouquet>
    {/each}
  </div>
</div>
