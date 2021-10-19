import homeRoute from '../http/home.js'
import Koa from 'koa'
import KoaRouter from '@koa/router'
import koaCompress from 'koa-compress'
import koaBody from 'koa-bodyparser'
import zlib from 'zlib'
import createRequestContext from '../middleware/create-request-context.js'
import { APP_KEY } from '../config/index.js'

export default () => {
  const internalApp = new Koa()
  internalApp.keys = [APP_KEY]
  internalApp.proxy = false
  internalApp
    .use(
      koaCompress({
        threshold: 2048,
        flush: zlib.constants.Z_SYNC_FLUSH,
      })
    )
    .use(koaBody())
    .use(createRequestContext(internalApp))
    .use(new KoaRouter().get('/', homeRoute).post('/', homeRoute).routes())

  return internalApp
}
