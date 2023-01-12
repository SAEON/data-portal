export default async ({ _source: { id, doi } } = {}, args, ctx) => {
  const { findLogs } = await ctx.mongo.dataFinders

  const result = await findLogs({
    type: 'download',
    $or: [{ 'info.doi': { $eq: doi } }, { 'info.odpId': { $eq: id } }],
  })

  return result.length
}
