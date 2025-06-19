import { readFile, stat } from 'fs/promises'
import { error, type IRequest } from 'itty-router'
import { homedir } from 'os'
import { join } from 'path'
import { sanitizeObject, whereObject } from '../lib'

export const getSession = async (req: IRequest) => {
  const { projectid, sessionid } = req.params

  try {
    const sessionPath = join(
      homedir(),
      '.claude',
      'projects',
      projectid,
      `${sessionid}.jsonl`,
    )
    const stats = await stat(sessionPath)
    const content = await readFile(sessionPath, 'utf-8')
    const lines = content.trim().split('\n')
    const jsonObjects = lines.map((line) => JSON.parse(line))

    const sessionData = {
      id: sessionid,
      modified: stats.mtime,
      content: jsonObjects
        .map(
          sanitizeObject([
            'sessionId',
            'cwd',
            'version',
            'isSidechain',
            'parentUuid',
            'userType',
            'type',
          ]),
        )
        .filter(
          whereObject([
            (o: any) => !o.message?.usage,
            (o: any) => !o.toolUseResult,
            (o: any) => o.timestamp,
            (o: any) => o.message?.content?.[0]?.text || typeof o.message?.content === 'string',
          ]),
        ),
    }

    return sessionData
  } catch (err) {
    return error(404, 'Session not found')
  }
}
