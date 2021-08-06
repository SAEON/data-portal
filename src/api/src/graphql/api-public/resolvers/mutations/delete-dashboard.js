import { ObjectId } from 'mongodb'

export default async (_, args, ctx) => {
  const { Dashboards } = await ctx.mongo.collections
  const { id } = args

  const { result } = await Dashboards.remove({
    _id: ObjectId(id),
  })

  return Boolean(result?.n)
}
