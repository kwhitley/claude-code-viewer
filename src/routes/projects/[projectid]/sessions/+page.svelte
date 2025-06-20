<script lang="ts">
  import { formatDate } from '$lib'

  export let data
</script>

<!-- MARKUP -->
<h1>Sessions</h1>

<ul>
  {#each data.sessions as session}
    <li>
      <a href={session.link}>{formatDate(session.modified)}</a>
    </li>
  {/each}
</ul>

<!-- STYLES -->
<style lang="scss">
  h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
  }

  a {
    color: var(--fg-50);
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    margin-bottom: 0.5rem;
    display: block;
    padding: 0.75rem 1.2rem;
    background-color: var(--fg-5);
    border-radius: 0.5rem;

    &:hover {
      background-color: var(--fg-10);
      color: var(--fg-100);
    }
  }

</style>