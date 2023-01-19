import idToTimestamp from '../../../../src/mongo/scripts/id-to-timestamp/index.js'

export default async collection => {
  await idToTimestamp(collection)
}
