export default async (ctx, next) => {
  try {
    await next()
    const status = ctx.status || 404
    if (status === 404) {
      ctx.throw(404)
    }
  } catch (err) {
    ctx.status = err.status || 500
    ctx.body = `404\n\nWelcome to the SAEON Data Portal API. There is no resource at this path`
  }
}
