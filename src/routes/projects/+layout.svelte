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
    padding: 1rem;
    overflow: auto;
  }
</style>
