import DataLoader from 'dataloader'

/**
 * Window for log collection before writing
 * to Mongo
 */
const LOG_BATCH_INTERVAL = 0

export default ({ _collections, db }) => () =>
  Object.entries(_collections).reduce((acc, [alias, name]) => {
    const loader = new DataLoader(
      lists =>
        db.then(db => db.collection(name)).then(collection => collection.insertMany(lists.flat())),
      {
        batchScheduleFn: callback => setTimeout(callback, LOG_BATCH_INTERVAL),
      }
    )

    acc[`insert${alias}`] = (...list) => loader.load(list)
    return acc
  }, {})
