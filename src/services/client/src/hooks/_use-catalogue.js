import { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { GlobalContext } from '../contexts/global'

// TODO - aggregation is not required for every equery

export default ({
  // React
  children = undefined,

  // Apollo
  fetchPolicy = undefined,

  // Pagination
  pageSize = 20,
  startCursor = undefined,
  endCursor = undefined,
  summaryLimit = 50,

  // Aggregation fields
  fields = [
    'linkedResources.linkedResourceType.raw',
    'publicationYear',
    'publisher.raw',
    'subjects.subject.raw',
    'creators.name.raw',
  ],

  // State
  terms = undefined,
  ids = undefined,
  dois = undefined,
  text = undefined,
  extent = undefined,
} = {}) => {
  const { global } = useContext(GlobalContext)
  const { referrer } = global

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
              metadata
            }
          }
        }
      }
    `,
    {
      fetchPolicy: fetchPolicy || 'cache-and-network',
      variables: {
        fields,
        ids,
        dois,
        extent,
        terms,
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
