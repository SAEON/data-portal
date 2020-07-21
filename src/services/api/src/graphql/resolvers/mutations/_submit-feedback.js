export default async (self, args, ctx) => {
  const { text, rating } = args
  const { Feedback } = await ctx.mongo.collections

  const { result } = await Feedback.insertOne({
    text,
    rating,
    createdAt: new Date(),
  })

  return result.ok ? true : false
}
