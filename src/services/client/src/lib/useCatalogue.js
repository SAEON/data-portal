import { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { GlobalContext } from '../modules/provider-global'

export default ({
  pageSize = 20,
  startCursor = undefined,
  endCursor = undefined,
  terms = undefined,
  summaryLimit = 50,
} = {}) => {
  const { global } = useContext(GlobalContext)
  const { extent, terms: _terms, text } = global

  return useQuery(
    gql`
      query(
        $extent: WKT_4326
        $match: String
        $terms: [TermInput!]
        $size: Int
        $before: ES_Cursor
        $after: ES_Cursor
        $fields: [String!]
        $summaryLimit: Int
      ) {
        catalogue {
          summary(
            fields: $fields
            filterByText: $match
            filterByExtent: $extent
            filterByTerms: $terms
            limit: $summaryLimit
          )
          records(
            extent: $extent
            match: $match
            terms: $terms
            size: $size
            before: $before
            after: $after
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
      variables: {
        fields: [
          'identifier.identifierType.raw',
          'publicationYear',
          'publisher.raw',
          'subjects.subject.raw',
          'creators.name.raw',
        ],
        extent,
        terms: terms || _terms,
        match: text,
        size: pageSize,
        after: endCursor,
        before: startCursor,
        summaryLimit,
      },
    }
  )
}
