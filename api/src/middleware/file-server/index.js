import Koa from 'koa'
import path from 'path'
import serve from 'koa-static'
import { readdir } from 'fs/promises'
import getCurrentDirectory from '../../lib/get-current-directory.js'

const __dirname = getCurrentDirectory(import.meta)
const SPA_PATH = path.join(__dirname, '../../clients')
const ENTRY_HTML = (await readdir(SPA_PATH))
  .filter(f => f.endsWith('.html'))
  .map(f => f.replace('.html', ''))

const koa = new Koa()
koa.use(serve(SPA_PATH))

export const fileServer = async (ctx, next) => {
  const page = ctx.request.url.match(/\/\w+/)[0].replace('/', '')
  const entry = ENTRY_HTML.includes(page) ? `${page}.html` : 'index.html'

  try {
    return await serve(SPA_PATH)(Object.assign(ctx, { path: entry }), next)
  } catch (error) {
    console.error('Error setting up static SPA middleware', error)
  }
}

export default koa
