<script lang="ts">
  import { formatDate } from '$lib'
  import CopyAction from './CopyAction.svelte'

  type Props = {
    content: string
    timestamp: Date
    role: string
    model?: string
  }

  let { content, timestamp, role, model }: Props = $props()
</script>

<div
  class="chat-entry"
  class:assistant={role === 'assistant'}
  class:user={role === 'user'}
  >
  <div class="content">
    {#if role ==='user' || true}
      <CopyAction content={content} --color="red;" />
    {/if}
    <pre>{content}</pre>
  </div>
  <footer>
    {#if model}
      <small class="model">{model}</small>
    {/if}
    <small class="timestamp">
      {formatDate(timestamp)}
    </small>
  </footer>
</div>

<style lang="scss">
  .chat-entry {
    display: flex;
    flex-flow: column;
    margin-bottom: 2rem;
    position: relative;
    --offset: 20%;
  }

  .timestamp {
    align-self: flex-end;
    font-size: 0.7rem;
  }

  pre {
    padding: 1.5rem;
    border-radius: 0.6rem;
    color: var(--color);
  }

  .user {
    margin-left: var(--offset);

    .content {
      --color: var(--bg-100);
      color: red;
    }

    pre {
      background-color: rgba(50, 200, 50, 0.3);
      background-color: rgba(100, 150, 230, 0.3);
      background-color: var(--fg-25);
      background-color: var(--fg-100);
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 5rem;
        height: 100%;
        background: linear-gradient(to right, rgba(var(--fg-color-rgb), 0), var(--fg-90));
      }
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0.1rem 0.3rem 0;

    &:has(.model) {
      flex-flow: row-reverse;
    }
  }

  .model {
    color: var(--fg-50);
  }

  .assistant {
    margin-right: var(--offset);

    .content {
      --color: var(--fg-50);
    }

    pre {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
</style>