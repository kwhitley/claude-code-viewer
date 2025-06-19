<script lang="ts">
  import { formatDate } from '$lib'
  import ChatEntry from './ChatEntry.svelte'

  type Props = {
    data: any
  }
  let { data }: Props = $props()
</script>

<h1>
  <span>Session Details</span>
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
    margin-bottom: 2rem;
    display: flex;
    flex-flow: column;
    gap: 0;
    line-height: 1;

    small {
      display: block;
      font-size: 0.9rem;
    }
  }

  pre {
    margin-bottom: 1rem;
  }
</style>
