import { ObjectId } from 'mongodb'

export default async (_, { id }, ctx) => {
  const { findUsers } = ctx.mongo.dataFinders
  return (await findUsers({ _id: new ObjectId(id) }))[0]
}
