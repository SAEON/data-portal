export default async (self, { input }, ctx) => {
  const { DataDownloadFormSubmissions: Collection } = await ctx.mongo.collections
  await Collection.insertOne({
    ...input,
  })
}
