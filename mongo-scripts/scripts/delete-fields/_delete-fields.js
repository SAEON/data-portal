import { db } from '../../db/index.js'

export default async list => {
  console.log(list)
  const lists = (await db).collection('lists')

  const _id = list._id

  const doc = await lists.findOneAndUpdate(
    { _id },
    {
      $unset: {
        hashOfFilter: 1,
        filter: 1,
      },
    },
    {
      upsert: false,
      returnDocument: 'after',
    }
  )

  return doc
}
