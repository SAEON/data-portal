export default async (self, args, ctx) => {
  const { text, rating, pathname } = args
  const { Feedback } = await ctx.mongo.collections

  const { result } = await Feedback.insertOne({
    text,
    rating,
    pathname,
    clientSession: ctx.cookies.get('ClientSession'),
    createdAt: new Date(),
  })

  return result?.ok ? true : false
}
