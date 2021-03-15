import { useContext } from 'react'
import { context as databookContext } from '../../../../../../contexts/databook-provider'
import { gql, useQuery } from '@apollo/client'
import Loading from '../../../../../../../../components/loading'

export default ({ children }) => {
  const { id } = useContext(databookContext)

  const { error, loading, data } = useQuery(
    gql`
      query databook($id: ID!) {
        databook(id: $id) {
          id
          charts {
            id
            title
            description
          }
        }
      }
    `,
    { variables: { id } }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return children(data.databook.charts)
}
