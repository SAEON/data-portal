import { normalize, join } from 'path'
import { getDirname, apply, print } from './tools.js'

const __dirname = getDirname(import.meta.url)

print('Building packages')
const PATH = normalize(join(__dirname, '../src/packages'))
apply({
  PATH,
  script: 'build',
})
