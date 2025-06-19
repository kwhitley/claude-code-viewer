import { AutoRouter } from 'itty-router'
import { getProjects, getProjectSessions, getSession } from './handlers'

const router = AutoRouter({ port: 3001 })
  // GET /projects - list all projects
  .get('/projects', getProjects)

  // GET /:projectid/sessions - list sessions for a project
  .get('/projects/:projectid/sessions', getProjectSessions)

  // GET /:projectid/sessions/:sessionid - get specific session content
  .get('/projects/:projectid/sessions/:sessionid', getSession)

// Start server
export default { ...router }
