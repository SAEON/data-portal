import { normalize, join } from 'path'
import { getDirname, apply } from './tools.js'

const __dirname = getDirname(import.meta.url)

const PATH = normalize(join(__dirname, '../src/packages'))
apply({
  PATH,
  script: 'build',
})
