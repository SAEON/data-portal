import { collections } from '../../mongo/index.js'

export default async () => {
  const { Lists } = await collections

  const cursor = await Lists.find({
    $and: [
      { disableSEO: { $nin: [true] } },
      { title: { $nin: [null, ''] } },
      { description: { $nin: [null, ''] } },
    ],
  })

  return cursor.toArray()
}
