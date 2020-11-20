import { useContext } from 'react'
import { context as databookContext } from '../../../context'
import { WithGqlQuery } from '../../../../../hooks'
import { gql } from '@apollo/client'
import Loading from '../../../../../components/loading'

export default () => {
  const { databook } = useContext(databookContext)
  const databookId = databook.doc._id

  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          browserClient {
            databook(id: $id) {
              id
              charts {
                id
                name
              }
            }
          }
        }
      `}
      variables={{ id: databookId }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw error
        }

        if (loading) {
          return <Loading />
        }

        const charts = data.browserClient.databook.charts

        return JSON.stringify(charts)
      }}
    </WithGqlQuery>
  )
}
