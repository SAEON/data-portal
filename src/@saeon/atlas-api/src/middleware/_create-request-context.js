import { db, collections, getDataLoaders } from '../mongo'

export default (app) => async (ctx, next) => {
  app.context.mongo = {
    db,
    collections,
    dataLoaders: getDataLoaders(),
  }
  await next()
}
