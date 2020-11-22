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
              dashboards {
                id
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

        const dashboards = data.browserClient.databook.dashboards

        return JSON.stringify(dashboards)
      }}
    </WithGqlQuery>
  )
}
