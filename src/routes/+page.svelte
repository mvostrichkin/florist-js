<script>
  let { data } = $props();
  let dataLength = data.items.length;
</script>

<h1>Обновлено: { data.lastUpdated }</h1><h2>Позиций: {dataLength}</h2> <a href="/api/update"><b style="color: white; background-color: #85249e; border-radius: 8px; padding: 8px; margin: 8px 0 8px 0; display: inline-block;">Обновить</b></a>
<ul>
	{#each data.items as item}
		<a href="https://www.florist.ru/bouquet-{item[1]}" class="underline"><li>{item[1]} — {item[0]}</li></a>
	{/each}
</ul>
