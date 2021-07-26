import { join, normalize } from 'path'
import { execWithOutput, exec, getDirname } from './tools.js'

const __dirname = getDirname(import.meta.url)

const branch = (await execWithOutput('git rev-parse --abbrev-ref HEAD')).trim()

if (branch !== 'next') {
  console.log('bump-patch aborted - not on master branch')
  process.exit(0)
}

/**
 * Bump API
 */
exec(
  `npm --prefix ${normalize(
    join(__dirname, '../src/api')
  )} version patch -m "on-commit patch"`
)

/**
 * Bump Client
 */
exec(
  `npm --prefix ${normalize(
    join(__dirname, '../src/client')
  )} version patch -m "on-commit patch"`
)
