<script>
  import CompositionsBlock from '$lib/CompositionsBlock.svelte';
  let { data } = $props();
</script>

<div style="margin:16px;">
	<span style="font-size:16px;">Последнее обновление базы: <span class="font-bold">{ data.lastUpdated }</span></span><br><span style="font-size:16px;">Всего букетов на сайте: <span class="font-bold">{ data.bouquetsQty }</span></span><br><a href="/api/update" style="">
    <b style="color: white;background: linear-gradient(180deg, #f2a3c1, #b100ff);border-radius: 20px;box-shadow: 8px 8px 32px 0 #beace5;padding: 8px 16px;height:40px;margin: 8px 0 8px 0;display: inline-block;">💫 Обновить</b></a><a href="/" class="font-bold" style="border-radius:20px;height:20px;border:solid 1px #4c2282;padding: 8px 16px;color: #4c2282;margin-left:16px">💐 Все букеты</a>
  <CompositionsBlock compositions={data.compositions} city={data.city}></CompositionsBlock>
</div>
