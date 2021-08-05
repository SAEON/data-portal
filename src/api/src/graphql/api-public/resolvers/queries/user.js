import { ObjectId } from 'mongodb'

export default async (_, { id }, ctx) => {
  const { findUsers } = ctx.mongo.dataFinders
  return (await findUsers({ _id: ObjectId(id) }))[0]
}
