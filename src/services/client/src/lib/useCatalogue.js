import { useContext } from 'react'
import { useQuery, gql } from '@apollo/client'
import { UriStateContext } from '../modules/provider-uri-state'

export default ({
  pageSize = 20,
  startCursor = undefined,
  endCursor = undefined,
  terms = undefined,
} = {}) => {
  const { getUriState } = useContext(UriStateContext)

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
      ) {
        catalogue {
          summary(
            fields: $fields
            filterByText: $match
            filterByExtent: $extent
            filterByTerms: $terms
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
        extent: getUriState({ splitString: false }).extent || undefined,
        terms:
          terms || getUriState({ splitString: true })?.terms?.map(term => JSON.parse(term)) || [],
        match: getUriState({ splitString: false }).text || undefined,
        size: pageSize,
        after: endCursor,
        before: startCursor,
      },
    }
  )
}
