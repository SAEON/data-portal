// TODO the redirect address should be configured as a URL client param. NOT static or api config
export default async ctx => {
  const { redirect = 'http://localhost:3000' } = ctx.request.query
  ctx.session = null
  ctx.redirect(redirect)
}
