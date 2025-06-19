import { readFile } from 'fs/promises'
import { error, type IRequest } from 'itty-router'
import { homedir } from 'os'
import { join } from 'path'
import { sanitizeObject, whereObject } from '$lib'

export const getSession = async (req: IRequest) => {
  const { projectid, sessionid } = req

  try {
    const sessionPath = join(
      homedir(),
      '.claude',
      'projects',
      projectid,
      `${sessionid}.jsonl`,
    )
    const content = await readFile(sessionPath, 'utf-8')
    const lines = content.trim().split('\n')
    const jsonObjects = lines.map((line) => JSON.parse(line))

    return jsonObjects
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
        ]),
      )
  } catch (err) {
    return error(404, 'Session not found')
  }
}
