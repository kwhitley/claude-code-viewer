import { readdir } from 'fs/promises'
import { error } from 'itty-router'
import { homedir } from 'os'
import { basename, join } from 'path'
import { reconstructPathFromParts } from '../lib'

export const getProjects = async () => {
  try {
    const claudeDir = join(homedir(), '.claude', 'projects')
    const projectDirs = await readdir(claudeDir)

    return Promise.all(
      projectDirs.map(async (dir) => {
        const parts = dir.split('-').slice(1) // remove initial empty part
        const reconstructedPath = await reconstructPathFromParts(parts)

        const userMatch = dir.match(/^-Users-([^-]+)-/)
        const user = userMatch ? userMatch[1] : 'unknown'

        let displayPath = reconstructedPath
        let name = dir

        if (reconstructedPath) {
          const home = homedir()
          name = basename(reconstructedPath)
          if (reconstructedPath.startsWith(home)) {
            displayPath = reconstructedPath.replace(home, '~')
          }
        }

        return {
          id: dir,
          path: displayPath,
          name,
          user,
          sessions: `/projects/${dir}/sessions`,
        }
      }),
    )
  } catch (err) {
    return error(500, 'Failed to read projects directory')
  }
}
