import mongodb from 'mongodb'

const { ObjectID } = mongodb

export default async (self, args, ctx) => {
  const { id } = args
  const { findMaps } = ctx.mongo.dataLoaders
  return (await findMaps({ _id: ObjectID(id) }))[0]
}
