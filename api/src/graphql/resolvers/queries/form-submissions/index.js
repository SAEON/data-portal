export default async (self, args, ctx) => {
  const { findDataDownloadFormSubmissions } = ctx.mongo.dataFinders

  return await findDataDownloadFormSubmissions({})
}
