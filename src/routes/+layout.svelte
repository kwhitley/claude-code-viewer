<script lang="ts">
  import '../styles/app.scss'
</script>

<div class="layout">
  <slot />
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
