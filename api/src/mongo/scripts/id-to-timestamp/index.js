import { db } from '../../index.js'

export default async collection => {
  const c = (await db).collection(collection)
  console.log('hi there', c)
}
