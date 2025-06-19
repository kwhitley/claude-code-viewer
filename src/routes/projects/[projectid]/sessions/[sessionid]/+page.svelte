<script lang="ts">
  import { formatDate } from '$lib'
  import ChatEntry from './ChatEntry.svelte'

  type Props = {
    data: any
  }
  let { data }: Props = $props()
  let { session } = data
</script>

<h1>Session Details
  <small>{formatDate(session.modified)}</small>
</h1>

<main>
  {#each session.content as item}
    <div class="item">
      <ChatEntry
        content={item.message?.content?.[0]?.text ?? item.message?.content}
        timestamp={item.timestamp}
        />

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
