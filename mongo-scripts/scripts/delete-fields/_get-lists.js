import { db } from '../../db/index.js'

export default async () => {
  const lists = (await db).collection('lists')

  console.log()

  return await lists
    .find({
      hashOfFilter: { $exists: true },
      filter: { $exists: true },
      search: { $exists: true },
      hashedSearch: { $exists: true },
    })
    .toArray()
}
