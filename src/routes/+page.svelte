<script>
  let { data } = $props();
</script>

<h1>Обновлено: { data.lastUpdated }</h1> <a href="/api/update"><b>Обновить</b></a>
<ul>
	{#each data.items as item}
		<li>{item}</li>
	{/each}
</ul>
