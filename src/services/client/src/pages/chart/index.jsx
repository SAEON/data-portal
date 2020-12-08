import { lazy, Suspense } from 'react'
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
        query($ids: [ID!]) {
          charts(ids: $ids) {
            id
            title
            description
            type
            config
            data
          }
        }
      `}
      variables={{ ids: [id] }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }

        const chart = data.charts.find(({ id: _id }) => _id === id)
        const chartDefinition = chartDefinitions.find(({ type }) => type === chart.type)
        const Chart = lazy(() => chartDefinition.getComponent())

        return (
          <Suspense fallback={<Loading />}>
            <Chart {...chart} />
          </Suspense>
        )
      }}
    </WithGqlQuery>
  )
}
