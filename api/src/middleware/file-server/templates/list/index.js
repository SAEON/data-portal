import { ObjectId } from 'mongodb'
import facets from '../../../../elasticsearch/query-builder/facets.js'
import { CLIENT_FILTER_CONFIG } from '../../../../config/index.js'

const EXCLUDE_KEYWORDS = ['unknown']

const AGG_FIELDS = [
  {
    id: 'doi-list',
    field: 'doi.raw',
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
    keywords: $KEYWORDS = '',
    description: $DESCRIPTION = 'SAEON metedata collection',
    generateKeywords = true,
    search: {
      text: filterByText = undefined,
      extent: filterByExtent = undefined,
      ids: filterByIds = undefined,
      dois: filterByDois = undefined,
      terms: filterByTerms = undefined,
    } = {},
  } = list || {}

  const generatedKeywords = generateKeywords
    ? (
        await facets({
          ctx,
          args: {
            fields: AGG_FIELDS,
            filterByText,
            filterByExtent,
            filterByIds,
            filterByDois,
            filterByTerms,
            limit: 10000,
          },
        })
      )
        .map(tags =>
          Object.entries(tags)
            .map(([key, tags]) => {
              if (key === 'collection-filter' || key === 'data-provider-filter') {
                return tags.map(({ key, ...rest }) => ({ key: key.split('-').join(' '), ...rest }))
              }

              return tags
            })
            .flat()
        )
        .flat()
        .map(({ key }) => key)
        .filter(val => {
          if (!val) return false
          if (typeof val === 'number') return false
          if (EXCLUDE_KEYWORDS.includes(val)) return false // Exclude certain words
          return true
        })
    : []

  return {
    $TITLE,
    $KEYWORDS: [
      ...new Set([$TITLE, ...$KEYWORDS.split(',').filter(_ => _), ...generatedKeywords]),
    ].sort((a, b) => {
      if (a.length < b.length) return 1
      if (a.length > b.length) return -1
      return 0
    }),
    $DESCRIPTION,
  }
}
