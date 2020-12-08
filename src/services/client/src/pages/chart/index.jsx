import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import Loading from '../../components/loading'
import { gql } from '@apollo/client'
import chartDefinitions from '../../components/charts'

export default ({ id }) => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/chart?id=${id}`,
    params: false,
  })
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          charts(id: $id) {
            id
            type
            xAxis
            yAxis
            data
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }

        return JSON.stringify(chartDefinitions)

        // return <pieChart.Component {...data.charts} />
      }}
    </WithGqlQuery>
  )
}
