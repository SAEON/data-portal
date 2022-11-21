import { db } from '../../db/index.js'

export default async () => {
  const lists = (await db).collection('lists')

  return await lists
    .find({
      filter: { $exists: true },
      search: { $exists: true },
    })
    .toArray()
}
