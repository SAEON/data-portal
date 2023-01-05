import { useContext } from 'react'
import { context as searchContext } from '../../../contexts/search'
import { gql, useQuery } from '@apollo/client'
import { PUBLIC_GQL_ADDRESS } from '../../../config'

export default () => {
  const { global } = useContext(searchContext)
  const { error, loading, data } = useQuery(
    gql`
      query catalogue($text: String!, $filter: JSON) {
        catalogue {
          id
          search(text: $text, filter: $filter) {
            totalCount
          }
        }
      }
    `,
    {
      variables: { text: global.text || '', filter: global.filter },
      fetchPolicy: 'cache-first',
    }
  )

  if (error) {
    throw new Error(
      `${PUBLIC_GQL_ADDRESS}: ${error}\n\nIt is likely that Elasticsearch has not been configured`
    )
  }

  return { error, loading, data }
}
