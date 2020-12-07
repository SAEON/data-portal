import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import { getUriState } from '../../lib/fns'
import Loading from '../../components/loading'
import { gql } from '@apollo/client'
import Chart from './chart'
import { Card, Grid } from '@material-ui/core'

const POLLING_INTERVAL = 500

export default ({ id }) => {
  const { poll } = getUriState()
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/dashboard?id=${id}`,
    params: false,
  })
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          dashboard(id: $id) {
            id
            charts {
              id
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data, startPolling }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }

        if (poll) {
          startPolling(POLLING_INTERVAL)
        }

        const { charts } = data.dashboard

        return (
          <div style={{ position: 'relative', width: `80%`, margin: 'auto' }}>
            <Card variant="outlined" style={{ height: '100%' }}>
              {charts.map(chart => (
                <div key={chart.id}>{<Chart chart={chart} />}</div>
              ))}
            </Card>
          </div>
        )
      }}
    </WithGqlQuery>
  )
}
