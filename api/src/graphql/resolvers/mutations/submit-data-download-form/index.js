export default async (self, { input }, ctx) => {
  const { DataDownloadFormSubmissions: Forms } = await ctx.mongo.collections
  await Forms.insertOne({
    createdAt: new Date(),
    ...input,
  })
}
