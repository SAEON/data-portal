import DataLoader from 'dataloader'
import sift from 'sift'

export default ({ _collections, db }) => () =>
  Object.entries(_collections).reduce((acc, [alias, name]) => {
    const loader = new DataLoader(filters =>
      db
        .then(db => db.collection(name))
        .then(collection => collection.find({ $or: filters }).toArray())
        .then(docs => filters.map(filter => docs.filter(sift(filter))))
    )

    acc[`find${alias}`] = filter => loader.load(filter)
    return acc
  }, {})
