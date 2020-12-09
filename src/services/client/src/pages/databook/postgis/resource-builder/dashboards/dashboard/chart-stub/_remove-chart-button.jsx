import { useContext } from 'react'
import { useApolloClient, gql } from '@apollo/client'
import { IconButton, Tooltip } from '@material-ui/core'
import DeleteIcon from 'mdi-react/DeleteIcon'
import { context as databookContext } from '../../../../../context'

const DASHBOARDS = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      charts {
        id
      }
    }
  }
`

export default ({ chart, dashboard }) => {
  const { databook } = useContext(databookContext)
  const client = useApolloClient()

  return (
    <Tooltip title="Remove chart from this dashboard">
      <IconButton
        size="small"
        onClick={() => {
          client.mutate({
            mutation: gql`
              mutation($chartId: ID!, $dashboardId: ID!) {
                removeChartFromDashboard(chartId: $chartId, dashboardId: $dashboardId) {
                  id
                }
              }
            `,
            variables: { chartId: chart.id, dashboardId: dashboard.id },
            update: (cache, { data }) => {
              const { dashboards } = cache.read({
                query: DASHBOARDS,
                variables: {
                  databookId: databook.doc._id,
                },
              })

              const { id: removedId } = data.removeChartFromDashboard

              const updatedDashbaords = [...dashboards].map(item => {
                item = { ...item }
                if (item.id === dashboard.id) {
                  item.charts = [...item.charts].filter(({ id }) => id !== removedId)
                }
                return item
              })

              cache.writeQuery({
                query: DASHBOARDS,
                data: { dashboards: updatedDashbaords },
              })
            },
          })
        }}
      >
        <DeleteIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
