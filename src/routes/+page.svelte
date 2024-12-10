<script>
  let { data } = $props();
  let dataLength = data.items.length;
</script>

<div style="margin:16px;">
	<h1>Обновлено: <span class="font-bold">{ data.lastUpdated }</span></h1><h2>Позиций: <span class="font-bold">{dataLength}</span></h2> <a href="/api/update" style=""><b style="color: white;
    background: linear-gradient(180deg, #e76fd2, #8e00db);
    border-radius: 16px;
    border: solid 1px #542065;
    box-shadow: 4px 8px 24px 0 #75349f;
    padding: 8px;
    margin: 8px 0 8px 0;
    display: inline-block;">Обновить</b></a>
<div class="font-sans">
	{#each data.items as item}
		<div style="display:inline-block;width:100%;">
		<a href="https://www.florist.ru/bouquet-{item[1]}"><span style="display:inline;" class="text-2xl font-bold text-violet-900 underline">{item[1]} — {item[0]}</span></a><br>
		{#each item[2] as item}
			<div style="float:left;background:white;margin: 8px;border-radius:32px;padding:24px;box-shadow: 0 16px 64px 8px #eddef5;border: solid 1px #a495ab;">
				Вариант: <span class="text-base font-bold text-pink-600">{item[0]}</span><br>
				{#each item[2] as i}
				<span class="font-bold text-sm">* {i[0]} x {i[1]}</span><br>
				{/each}
			</div>
		{/each}
		</div>
	{/each}
</div>
</div>
