export default async (self, args, ctx) => {
  const { text, rating, pathname } = args
  console.log('cookies get', ctx.cookies.get('ClientSession'))
  const { Feedback } = await ctx.mongo.collections

  const { result } = await Feedback.insertOne({
    text,
    rating,
    pathname,
    // clientSession: ctx.response.header['set-cookie'],
    createdAt: new Date(),
  })

  return result?.ok ? true : false
}
