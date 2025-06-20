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
    max-width: 1200px;
    margin: 0 auto;
    box-shadow: 0 0 10em 0 rgba(0, 0, 0, 0.3);
  }

  main {
    overflow: auto;
  }
</style>
