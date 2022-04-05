import { useContext } from 'react'
import { context as globalContext } from '../../../contexts/global'
import { gql, useQuery } from '@apollo/client'
import { PUBLIC_GQL_ADDRESS } from '../../../config'

export default () => {
  const { global } = useContext(globalContext)
  const { error, loading, data } = useQuery(
    gql`
      query catalogue($text: String!) {
        catalogue {
          id
          records(text: $text) {
            totalCount
          }
        }
      }
    `,
    {
      variables: { text: global.text || '' },
      fetchPolicy: 'cache-first'
    }
  )

  if (error) {
    throw new Error(
      `${PUBLIC_GQL_ADDRESS}: ${error}\n\nIt is likely that Elasticsearch has not been configured`
    )
  }

  return { error, loading, data }
}
