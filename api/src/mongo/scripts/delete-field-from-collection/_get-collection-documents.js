import { db as _db } from '../../index.js'

export default async ({ collection, field }) => {
  const db = await _db
  const lists = db.collection(collection)

  return await lists.find({ [field]: { $exists: true } }).toArray()
}
