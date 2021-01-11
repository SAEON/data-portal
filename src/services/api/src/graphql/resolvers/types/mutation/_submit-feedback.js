import { CATALOGUE_CLIENT_ID } from '../../../../config.js'

export default async (self, args, ctx) => {
  const { input } = args
  const { Feedback } = await ctx.mongo.collections

  const { result } = await Feedback.insertOne(
    Object.assign(
      {
        clientSession: ctx.cookies.get(CATALOGUE_CLIENT_ID),
        createdAt: new Date(),
      },
      input
    )
  )

  return result?.ok ? true : false
}
