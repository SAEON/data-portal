import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import Loading from '../../components/loading'
import { gql } from '@apollo/client'
import Scatterplot from '../../components/charts/scatterplot'

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
            xAxis
            yAxis
            data
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw error
        }

        if (loading) {
          return <Loading />
        }

        return <Scatterplot {...data.charts} />
      }}
    </WithGqlQuery>
  )
}
