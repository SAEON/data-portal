export default async (ctx, next) => {
  console.log('authenticating', ctx.headers)
  await next()
}
