import Koa from 'koa'
import serve from 'koa-static'
import { readdir } from 'fs/promises'
import getCurrentDirectory from '../../lib/get-current-directory.js'
import { createReadStream } from 'fs'
import { join, normalize } from 'path'
import replacestream from 'replacestream'
import { getData, replace } from './templates/index.js'
import { DEPLOYMENT_ENV, NODE_ENV } from '../../config/index.js'
export { default as robotsTxt } from './robots.txt/index.js'

const hoursToMs = h => h * 60 * 60 * 1000

const __dirname = getCurrentDirectory(import.meta)
const SPA_PATH = join(__dirname, '../../clients')

const ENTRY_HTML = (
  await readdir(SPA_PATH).catch(error => {
    if (DEPLOYMENT_ENV === 'production' || NODE_ENV === 'production') {
      throw error
    } else {
      console.error(
        'Missing react client. This is probably fine if you are developing the client locally',
        error
      )
    }
  })
)
  ?.filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''))

const koa = new Koa()
koa.use(
  serve(SPA_PATH, {
    maxage: hoursToMs(730), // 1 month
    hidden: false,
    defer: false,
    gzip: true,
    br: false,
    extensions: false,
  })
)

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
