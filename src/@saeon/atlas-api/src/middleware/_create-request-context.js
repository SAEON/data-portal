export default (app) => async (ctx, next) => {
  app.context.db = {}
  await next()
}
