<script>
  import CompositionsBlock from '$lib/CompositionsBlock.svelte';
  let { data } = $props();
</script>

<div style="margin:16px;">
	<h1>Последнее обновление базы: <span class="font-bold">{ data.lastUpdated }</span></h1><h2>Всего букетов на сайте: <span class="font-bold">{ data.bouquetsQty }</span></h2> <a href="/api/update" style="">
    <b style="color: white;
    background: linear-gradient(180deg, #e76fd2, #8e00db);
    border-radius: 16px;
    box-shadow: 4px 8px 32px 0 #a899b2;
    padding: 8px;
    margin: 8px 0 8px 0;
    display: inline-block;">🔄 Обновить</b></a><a href="/" class="font-bold" style="border-radius:16px;border:solid 1px #8e00db;padding: 8px;color: #8e00db;margin-left:16px">🧾 К списку букетов</a>
  <CompositionsBlock compositions={data.compositions}></CompositionsBlock>
</div>
