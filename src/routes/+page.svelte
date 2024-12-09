<script>
  let { data } = $props();
</script>

<ul>
	{#each data.items as item}
		<li>{item}</li>
	{/each}
</ul>
