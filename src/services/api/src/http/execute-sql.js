import mongo from 'mongodb'
const { ObjectID } = mongo

export default async ctx => {
  await ctx.userModel.checkRole(ctx, 'datascientist')
  const { findDatabooks } = ctx.mongo.dataFinders

  const { databookId, sql } = ctx.request.body

  const databook = (await findDatabooks({ _id: ObjectID(databookId) }))[0]
  const { username, password: encryptedPassword } = databook.authentication
  const password = ctx.crypto.decrypt(encryptedPassword)

  const { query } = ctx.postgis

  ctx.body = await query({
    text: `${sql}`,
    client: {
      user: username,
      password,
    },
  })
}
