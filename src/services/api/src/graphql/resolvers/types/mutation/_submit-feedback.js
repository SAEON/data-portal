export default async (self, args, ctx) => {
  const { input } = args
  const { Feedback } = await ctx.mongo.collections

  const { result } = await Feedback.insertOne(
    Object.assign(
      {
        clientSession: ctx.cookies.get('ClientSession'),
        createdAt: new Date(),
      },
      input
    )
  )

  return result?.ok ? true : false
}
