import makeIterator from './extract/index.js'
import loadPublishedRecords from './load-published-records/index.js'
import removeUnpublishedRecords from './load-unpublished-records/index.js'

export default async () => {
  const result = {}

  let iterator = await makeIterator()
  while (!iterator.done) {
    const { data } = iterator

    // Published records
    await loadPublishedRecords(data.publish)
      .then(res =>
        res.items?.forEach(({ index }) => {
          result[index.status] = (result[index.status] || 0) + 1
        })
      )
      .then(() => console.info(`Upserted ${data.publish.length} published records`))

    // Delete any unpublished records
    await removeUnpublishedRecords(data.unpublish)
      .then(res => console.log('TODO', res))
      .then(() => data.unpublish.length && console.info(`Deleted ${data.unpublish.length} unpublished records`))

    iterator = await iterator.next()
  }

  return result
}
