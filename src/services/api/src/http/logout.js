// TODO the redirect address should be configured as a URL client param. NOT static or api config
export default async ctx => {
  ctx.session = null
  ctx.redirect('http://localhost:3001')
}
