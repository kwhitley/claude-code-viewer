import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response = await fetch(
    `/api/projects/${params.projectid}/sessions/${params.sessionid}`,
  )
  const session = await response.json()
  return { session }
}
