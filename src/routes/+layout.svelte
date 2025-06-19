<div class="layout">
	<main>
		<slot />
	</main>
</div>

<style>
	.layout {
		display: grid;
		grid-template-columns: 250px 1fr;
		height: 100vh;
		width: 100vw;
	}
	main {
		overflow: auto;
	}
</style>