<script>
  let { data } = $props();
</script>

<h1>Обновлено: { data.lastUpdated }</h1> <a href="/api/update"><b>Обновить</b></a>
<ul>
	{#each data.items as item}
		<a href="https://www.florist.ru/bouquet-{item[1]}"><li>{item[1]} — {item[0]}</li></a>
	{/each}
</ul>
