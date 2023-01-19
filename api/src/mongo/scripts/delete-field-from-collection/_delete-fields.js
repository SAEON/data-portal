import { db as _db } from '../../index.js'

export default async ({doc, field, collection}) => {
  const db = await _db
  const lists = db.collection(collection)
  const _id = doc._id

  const updatedDoc = await lists.findOneAndUpdate(
    { _id },
    {
      $unset: {
        [field]: 1
      },
    },
    {
      upsert: false,
      returnDocument: 'after',
    }
  )

  return updatedDoc
}
