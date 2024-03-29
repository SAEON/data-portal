import DataLoader from 'dataloader'
import sift from 'sift'
import collections from './collections/index.js'
import logMongoQuery from '../lib/log-mongo-query.js'

export default db => () =>
  Object.entries(collections).reduce((acc, [alias, { name }]) => {
    const loader = new DataLoader(filters => {
      const query = { $or: filters }
      logMongoQuery(query, `${name} (batched)`)
      return db
        .then(db => db.collection(name))
        .then(collection => collection.find(query).toArray())
        .then(docs => filters.map(filter => docs.filter(sift(filter))))
    })
    acc[`find${alias}`] = filter => loader.load(filter)
    return acc
  }, {})
