import { db } from '../../db/index.js'

export default async list => {
  const lists = (await db).collection('lists')

  const _id = list._id
  const hashOfFilter = list.hashedSearch
  const filter = list.search

  const $set = {}
  if (hashOfFilter) $set.hashOfFilter = hashOfFilter
  if (filter) $set.filter = filter

  const doc = await lists.findOneAndUpdate(
    { _id },
    {
      $set,
    },
    {
      upsert: false,
      returnDocument: 'after',
    }
  )

  return doc
}
