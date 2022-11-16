import Koa from 'koa'
import serve from 'koa-static'
import { readdir } from 'fs/promises'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import { createReadStream } from 'fs'
import { join, normalize } from 'path'
import replacestream from 'replacestream'
import { getData, replace } from './templates/index.js'

const __dirname = getCurrentDirectory(import.meta)
const SPA_PATH = join(__dirname, '../../clients')
const ENTRY_HTML = (await readdir(SPA_PATH))
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''))

const koa = new Koa()
koa.use(serve(SPA_PATH))

export const templateServer = async ctx => {
  const page = ctx.request.url.match(/\/\w+/)[0].replace('/', '')
  const fileName = ENTRY_HTML.includes(page) ? `${page}.html` : 'index.html'
  const filePath = normalize(join(SPA_PATH, fileName))

  const data = await getData({ ctx, page })
  ctx.response.set('content-type', 'text/html')
  ctx.body = data
    ? createReadStream(filePath).pipe(replacestream(/\$[A-Z]+/g, replace.bind(data)))
    : createReadStream(filePath)
}

export default koa
