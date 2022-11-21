import { db } from '../../db/index.js'

export default async list => {
  const lists = (await db).collection('lists')
  const _id = list._id

  const doc = await lists.findOneAndUpdate(
    { _id },
    {
      $unset: {
        hashedSearch: 1,
        search: 1,
      },
    },
    {
      upsert: false,
      returnDocument: 'after',
    }
  )

  return doc
}
