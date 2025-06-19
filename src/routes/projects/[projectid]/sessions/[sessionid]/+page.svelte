<script lang="ts">
  import { formatDate } from '$lib'
  import ChatEntry from './ChatEntry.svelte'

  type Props = {
    data: any
  }
  let { data }: Props = $props()
</script>

<h1>Session Details
  <small>{formatDate(data.session.modified)}</small>
</h1>

<main>
  {#each data.session.content as item}
    <div class="item">
      <ChatEntry {...item} />

      <!-- <pre>{JSON.stringify(item, null, 2)}</pre> -->
    </div>
  {/each}
</main>

<style>
  h1 {
    font-size: 2rem;
    font-weight: 500;
    margin-bottom: 1rem;

    small {
      display: block;
      font-size: 1rem;
    }
  }

  pre {
    margin-bottom: 1rem;
  }
</style>
