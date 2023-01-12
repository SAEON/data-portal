export default async (self, args, ctx) => {
  const { DataDownloadFormSubmissions: Forms } = await ctx.mongo.collections

  const result = await Forms.aggregate([{ $sort: { createdAt: -1 } }])

  return await result.toArray()
}
