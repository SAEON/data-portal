import { db } from '../../db/index.js'

export default async list => {
  const lists = (await db).collection('lists')

  const _id = list._id
  const hashOfFilter = list.hashedSearch
  const filter = list.search

  const doc = await lists.findOneAndUpdate(
    { _id },
    {
      $set: {
        hashOfFilter,
        filter,
      },
    },
    {
      upsert: false,
      returnDocument: 'after',
    }
  )

  return doc
}
