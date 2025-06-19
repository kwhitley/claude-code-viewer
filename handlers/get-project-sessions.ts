import { readdir, stat } from 'fs/promises'
import { error, type IRequest } from 'itty-router'
import { homedir } from 'os'
import { join } from 'path'

export const getProjectSessions = async (req: IRequest) => {
  const { projectid } = req.params
  try {
    const projectPath = join(homedir(), '.claude', 'projects', projectid)
    const files = await readdir(projectPath)
    const sessionFiles = files.filter((file) => file.endsWith('.jsonl'))

    const sessions = await Promise.all(
      sessionFiles.map(async (file) => {
        const sessionId = file.replace('.jsonl', '')
        const filePath = join(projectPath, file)
        const fileStats = await stat(filePath)

        return {
          id: sessionId,
          link: `/projects/${projectid}/sessions/${sessionId}`,
          date: fileStats.birthtime,
        }
      }),
    )

    return sessions.sort((a, b) => b.date.getTime() - a.date.getTime())
  } catch (err) {
    return error(404, 'Project not found or no sessions available')
  }
}
