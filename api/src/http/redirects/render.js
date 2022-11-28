export default async ctx => {
  ctx.status = 301
  ctx.redirect(ctx.url.replace('/render', '/list'))
}
