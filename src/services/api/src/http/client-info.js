export default async ctx => {
  const ipAddress = ctx.request.headers['X-Real-IP'] || ctx.request.ip
  ctx.body = {
    ipAddress,
  }
}
