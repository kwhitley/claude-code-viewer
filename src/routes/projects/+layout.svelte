<script lang="ts">
  import Sidebar from '$components/Sidebar.svelte'
  export let data
</script>

<Sidebar {...data} />

<div class="content">
  <slot />
</div>

<style>
  .content {
    padding: 1.5rem 3rem 1rem 2rem;
    overflow: auto;
  }
</style>
