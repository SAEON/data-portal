import { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { GlobalContext } from '../contexts/global'

export default ({
  children = undefined,
  pageSize = 20,
  startCursor = undefined,
  endCursor = undefined,
  terms = undefined,
  summaryLimit = 50,
  ids = undefined,
  dois = undefined,
  text = undefined,
  fetchPolicy = undefined,
} = {}) => {
  const { global } = useContext(GlobalContext)
  const { extent, terms: _terms, referrer } = global
  text = text || global.text

  const result = useQuery(
    gql`
      query(
        $extent: WKT_4326
        $text: String
        $terms: [TermInput!]
        $size: Int
        $before: ES_Cursor
        $after: ES_Cursor
        $fields: [String!]
        $summaryLimit: Int
        $ids: [ID!]
        $dois: [String!]
        $referrer: String
      ) {
        catalogue(referrer: $referrer) {
          id
          summary(
            fields: $fields
            filterByText: $text
            filterByExtent: $extent
            filterByTerms: $terms
            limit: $summaryLimit
            filterByIds: $ids
            filterByDois: $dois
          )
          records(
            extent: $extent
            text: $text
            terms: $terms
            size: $size
            before: $before
            after: $after
            ids: $ids
            dois: $dois
          ) {
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
            totalCount
            nodes {
              target
            }
          }
        }
      }
    `,
    {
      fetchPolicy: fetchPolicy || 'cache-first',
      variables: {
        fields: [
          'linkedResources.linkedResourceType.raw',
          'publicationYear',
          'publisher.raw',
          'subjects.subject.raw',
          'creators.name.raw',
        ],
        ids,
        dois,
        extent,
        terms: terms || _terms,
        text,
        size: pageSize,
        after: endCursor,
        before: startCursor,
        summaryLimit,
        referrer,
      },
    }
  )

  return children ? children(result) : result
}
