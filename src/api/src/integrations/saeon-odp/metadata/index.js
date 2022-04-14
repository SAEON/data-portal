import makeIterator from './extract/index.js'
import insertToEs from './load/index.js'

export default async () => {
  const result = {}

  let iterator =await makeIterator()
  while (!iterator.done) {
    const { data } = iterator

    const res = await insertToEs(data)
    console.info(`Processed ${data.length} records`)

    res.items?.forEach(({ index }) => {
      result[index.status] = (result[index.status] || 0) + 1
    })

    iterator = await iterator.next()
  }

  return result
}
