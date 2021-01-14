import { lazy, Suspense } from 'react'
import WithGqlQuery from '../../hooks/with-gql-query'
import Loading from '../../components/loading'
import { gql } from '@apollo/client'
import chartDefinitions from '../../components/charts'
import { Fade } from '@material-ui/core'

export default ({ id, style = {} }) => {
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
          <Fade in={Boolean(data)} key={`chart-${id}`}>
            <span>
              <Suspense fallback={<Loading />}>
                <div
                  style={Object.assign(
                    { height: '100%', width: '100%', position: 'relative' },
                    style
                  )}
                >
                  <Chart {...chart} />
                </div>
              </Suspense>
            </span>
          </Fade>
        )
      }}
    </WithGqlQuery>
  )
}
