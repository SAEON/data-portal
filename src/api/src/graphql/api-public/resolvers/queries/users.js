export default async (self, args, ctx) => {
  const { findUsers } = ctx.mongo.dataFinders
  return await findUsers({})
}
