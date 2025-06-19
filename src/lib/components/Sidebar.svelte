<script lang="ts">
	import { page } from '$app/stores';
	import { browser } from '$app/environment';

	type Project = { id: string; name: string };
	type Session = { id: string };

	export let projects: Project[] = [];
	export let initialSessions: Session[] | null = null;

	let sessionsByProject: Record<string, Session[]> = {};

	// On initial load, if we have pre-loaded sessions, populate our state
	if (initialSessions && $page.params.projectid) {
		sessionsByProject[$page.params.projectid] = initialSessions;
	}

	// This reactive block will handle CLIENT-SIDE navigation to new projects
	$: if (browser && $page.params.projectid) {
		loadSessionsForActiveProject($page.params.projectid);
	}

	async function loadSessionsForActiveProject(projectId: string) {
		// Don't re-fetch if we already have the data
		if (sessionsByProject[projectId]) {
			return;
		}
		const response = await fetch(`/api/projects/${projectId}/sessions`);
		if (response.ok) {
			sessionsByProject[projectId] = await response.json();
			// Force reactivity by reassigning the object
			sessionsByProject = sessionsByProject;
		}
	}
</script>

<aside>
	<nav>
		<ul>
			{#each projects as project}
				{@const isExpanded = $page.params.projectid === project.id}
				<li>
					<a href="/projects/{project.id}/sessions" class:active={isExpanded}>{project.name}</a>
					{#if isExpanded}
						<ul>
							{#each sessionsByProject[project.id] ?? [] as session}
								{@const isSessionActive = $page.params.sessionid === session.id}
								<li>
									<a
										href="/projects/{project.id}/sessions/{session.id}"
										class:active={isSessionActive}
									>
										{session.id}
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

<style>
	aside {
		background-color: #f4f4f4;
		padding: 1rem;
		height: 100%;
		overflow: auto;
	}
	ul {
		list-style: none;
		padding: 0;
		padding-left: 1rem;
	}
	a {
		display: block;
		padding: 0.25rem;
		text-decoration: none;
		color: #333;
	}
	a.active {
		font-weight: bold;
	}
</style>