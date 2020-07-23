import parse from 'co-body'

export default async (ctx, next) => {
  console.log('HELLO WORLD!')
  ctx.body = await parse(ctx)
  await next()
}
