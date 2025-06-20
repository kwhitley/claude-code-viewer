<script lang="ts">
  import { browser } from '$app/environment'
  import { page } from '$app/stores'
  import { formatDate } from '$lib'
  import { slide } from 'svelte/transition'

  type Project = { id: string; name: string; modified: string }
  type Session = { id: string; modified: string }

  export let projects: Project[] = []
  export let initialSessions: Session[] | null = null

  let sessionsByProject: Record<string, Session[]> = {}

  // On initial load, if we have pre-loaded sessions, populate our state
  if (initialSessions && $page.params.projectid) {
    sessionsByProject[$page.params.projectid] = initialSessions
  }

  // This reactive block will handle CLIENT-SIDE navigation to new projects
  $: if (browser && $page.params.projectid) {
    loadSessionsForActiveProject($page.params.projectid)
  }

  async function loadSessionsForActiveProject(projectId: string) {
    // Don't re-fetch if we already have the data
    if (sessionsByProject[projectId]) {
      return
    }
    const response = await fetch(`/api/projects/${projectId}/sessions`)
    if (response.ok) {
      sessionsByProject[projectId] = await response.json()
      // Force reactivity by reassigning the object
      sessionsByProject = sessionsByProject
    }
  }
</script>

<aside>
  <h1>
    <small>Claude Code</small>
    <span>Projects</span>
  </h1>
  <nav>
    <ul>
      {#each projects as project}
        {@const isExpanded = $page.params.projectid === project.id}
        <li>
          <a href="/projects/{project.id}/sessions" class:active={isExpanded} class="project">
            {project.name}
            <small>{formatDate(project.modified)}</small>
          </a>
          {#if isExpanded}
            <ul transition:slide={{ duration: 200 }}>
              {#each sessionsByProject[project.id] ?? [] as session}
                {@const isSessionActive = $page.params.sessionid === session.id}
                <li>
                  <a
                    href="/projects/{project.id}/sessions/{session.id}"
                    class:active={isSessionActive}
                  >
                  <small class="title">Session</small>
                    {formatDate(session.modified)}
                  </a>
                </li>
              {/each}
            </ul>
          {/if}
        </li>
      {/each}
    </ul>
  </nav>
</aside>

<style lang="scss">
  aside {
    background-color: #f4f4f4;
    padding: 1rem;
    height: 100%;
    overflow: auto;
  }

  h1 {
    line-height: 1;
    margin-bottom: 1.25rem;
    font-weight: 500;
    font-size: 2rem;
    font-family: 'Roboto Mono', monospace;
    padding: 0.5rem;

    display: flex;
    flex-flow: column;

    color: var(--accent-color);

    small {
      font-size: 0.5em;
      color: var(--accent-75);
    }
  }

  .project {
    font-weight: bold;
  }

  ul {
    list-style: none;

    ul {
      padding-left: 1rem;
      font-size: 0.8rem;
    }
  }

  a {
    display: block;
    padding: 0.35rem 0.6rem;
    border-radius: 0.25rem;
    text-decoration: none;
    color: #333;

    &:hover {
      background-color: var(--accent-10);
    }

    &.active {
      // color: var(--bg-color);
      background-color: var(--fg-10);
      font-weight: bold;
    }

    small {
      display: block;
    }
  }

  .title {
    text-transform: uppercase;
    font-size: 0.7em;
    opacity: 1;
    font-weight: bold;
    color: var(--fg-50);  }
</style>
