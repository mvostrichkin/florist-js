<script>
  let { data } = $props();
</script>

<h1>Обновлено: { data.lastUpdated }</h1> <a href="/api/update"><b>Обновить</b></a>
<hr>
<ul>
	{#each data.items as item}
		<a href="https://www.florist.ru/bouquet-{item[1]}"><span class="text-2xl font-bold text-green-900">{item[1]} — {item[0]}</span></a><br>
		{#each item[2] as item}
			<span class="text-base">{item[0]}</span><br>
			{#each item[2] as i}
			<span class="font-bold text-xs">* {i[0]} x {i[1]}</span><br>
			{/each}
			<br>
		{/each}
		<hr>
	{/each}
</ul>
