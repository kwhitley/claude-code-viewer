<script lang="ts">
	import Sidebar from '$lib/components/Sidebar.svelte';
	export let data;
</script>

<Sidebar projects={data.projects} initialSessions={data.initialSessions} />

<div class="content">
	<slot />
</div>

<style>
	.content {
		padding: 1rem;
		overflow: auto;
	}
</style>