<script>
  let { data } = $props();
  let dataLength = data.items.length;
</script>

<div style="margin:16px;">
<h1>Обновлено: <span class="font-bold">{ data.lastUpdated }</span></h1><h2>Позиций: <span class="font-bold">{dataLength}</span></h2> <a href="/api/update"><b style="color: white;
    background: linear-gradient(180deg, #e76fd2, #8e00db);
    border-radius: 16px;
    border: solid 1px #542065;
    box-shadow: 4px 8px 24px 0 #75349f;
    padding: 8px;
    margin: 8px 0 8px 0;
    display: inline-block;">Обновить</b></a>
<ul>
	{#each data.items as item}
		<a href="https://www.florist.ru/bouquet-{item[1]}" class="underline"><li>{item[1]} — {item[0]}</li></a>
	{/each}
</ul>
</div>
