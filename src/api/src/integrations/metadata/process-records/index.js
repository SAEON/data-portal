import transformForEs from './_transform-for-es.js'
import insertToEs from './_insert-to-es.js'

export default async data => {
  const esRecords = transformForEs(data)
  return await insertToEs(esRecords)
}
