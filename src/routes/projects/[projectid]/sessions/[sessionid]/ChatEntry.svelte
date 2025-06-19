<script lang="ts">
  import { formatDate } from '$lib'

  type Props = {
    content: string
    timestamp: Date
  }

  let { content, timestamp }: Props = $props()
</script>

<div class="chat-entry">
  <div class="content">
    <pre>{content}</pre>
  </div>
  <small class="timestamp">
    {formatDate(timestamp)}
  </small>
</div>

<style lang="scss">
  .chat-entry {
    display: flex;
    flex-flow: column;
    margin-bottom: 2rem;
  }

  .timestamp {
    align-self: flex-end;
    font-size: 0.7rem;
  }

  pre {
    padding: 1.5rem;
  }
</style>