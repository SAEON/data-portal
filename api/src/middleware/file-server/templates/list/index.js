import { ObjectId } from 'mongodb'
import facets from '../../../../elasticsearch/query-builder/facets.js'
import { CLIENT_FILTER_CONFIG } from '../../../../config/index.js'

const AGG_FIELDS = [
  {
    id: '_linked-resources-filter',
    field: 'linkedResources.linkedResourceType.raw',
    path: 'linkedResources',
  },
  ...CLIENT_FILTER_CONFIG.map(({ id, field, path, filters, sortBy, sortOrder }) => {
    return { id, field, path, filters, sortBy, sortOrder }
  }),
]

export default async ctx => {
  const { search: listId } = ctx.query
  const { findLists } = ctx.mongo.dataFinders
  const list = listId ? (await findLists({ _id: ObjectId(listId) }))[0] : undefined

  const {
    title: $TITLE = 'SAEON Collection',
    keywords: $KEYWORDS = 'SAEON collection, datasets, saeon',
    description: $DESCRIPTION = 'SAEON metedata collection',
    search: {
      text: filterByText = undefined,
      extent: filterByExtent = undefined,
      ids: filterByIds = undefined,
      dois: filterByDois = undefined,
      terms: filterByTerms = undefined,
    } = {},
  } = list || {}

  const tags = await facets({
    ctx,
    args: {
      fields: AGG_FIELDS,
      filterByText,
      filterByExtent,
      filterByIds,
      filterByDois,
      filterByTerms,
    },
  })

  console.log('TODO - decide which of these become keywords', JSON.stringify(tags))

  return {
    $TITLE,
    $KEYWORDS,
    $DESCRIPTION,
  }
}
