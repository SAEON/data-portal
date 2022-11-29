import makeIterator from './extract/index.js'
import loadPublishedRecords from './load-records/index.js'
import deleteRecords from './delete-records/index.js'

export default async ({skipInsert, deleteSelected }) => {
  const result = {
    deletedCount: 0,
  }

  if (!skipInsert) {
    let iterator = await makeIterator()
    while (!iterator.done) {
      const { data } = iterator
  
      // Published records
      await loadPublishedRecords(data.publish).then(res => {
        res.items?.forEach(({ index }) => {
          result[index.status] = (result[index.status] || 0) + 1
        })
        console.info(`Upserted ${data.publish.length} published records`)
      })
  
      // Delete any existing records marked as unpublished records in odp.saeon
      await deleteRecords(data.unpublish).then(res => {
        if (res) {
          result.deletedCount = result.deletedCount + (res.deleted || 0)
          console.info(`Deleted ${res.deleted || 0} unpublished records`)
        }
      })
  
      iterator = await iterator.next()
    }
  }

  if (deleteSelected.length) {
    await deleteRecords(deleteSelected).then(res => {
      if (res) {
        result.deletedCount = result.deletedCount + (res.deleted || 0)
        console.info(`Deleted ${res.deleted || 0} unpublished records`)
      }
    })
  }

  return result
}
