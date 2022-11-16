import { ObjectId } from 'mongodb'
import facets from '../../../../elasticsearch/query-builder/facets.js'

export default async ctx => {
  const { search: listId } = ctx.query
  const { findLists } = ctx.mongo.dataFinders
  const list = listId ? (await findLists({ _id: ObjectId(listId) }))[0] : undefined

  console.log(list)

  return {
    $TITLE: list?.title || 'SAEON Collection',
    $KEYWORDS: list?.keywords || 'SAEON collection, datasets, saeon',
    $DESCRIPTION: list?.description || 'SAEON metedata collection',
  }
}
