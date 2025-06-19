import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ fetch, params }) => {
  const projectsRes = await fetch('/api/projects')
  const projects = await projectsRes.json()

  let initialSessions = null
  if (params.projectid) {
    const sessionsRes = await fetch(
      `/api/projects/${params.projectid}/sessions`,
    )
    if (sessionsRes.ok) {
      initialSessions = await sessionsRes.json()
    }
  }

  return { projects, initialSessions }
}
