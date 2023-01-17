import { db } from '../../index.js'

export default async c => {
  const collection = (await db).collection(c)
  const cursor = await collection.find({ createdAt: { $exists: false } }, { batchSize: 100 })
  while (await cursor.hasNext()) {
    const doc = await cursor.next()
    const updatedDoc = await collection.findOneAndUpdate(
      { _id: doc._id },
      {
        $set: {
          createdAt: doc._id.getTimestamp(),
        },
      },
      {
        upsert: false,
        returnDocument: 'after',
      }
    )

    console.info('Updated', updatedDoc)
  }
}
