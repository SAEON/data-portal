import { useContext } from 'react'
import { useApolloClient, gql } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from 'mdi-react/CloseIcon'
import { context as databookContext } from '../../../../../../contexts/databook-provider'

const DASHBOARDS = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      layout
    }
  }
`

export default ({ chartId, dashboard }) => {
  const databook = useContext(databookContext)
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
            variables: { chartId, dashboardId: dashboard.id },
            update: (cache, { data }) => {
              const { dashboards } = cache.read({
                query: DASHBOARDS,
                variables: { databookId },
              })

              const { id: removedId } = data.removeChartFromDashboard

              const updatedDashbaords = [...dashboards].map(item => {
                item = { ...item }
                if (item.id === dashboard.id) {
                  item.layout = [...item.layout].filter(({ content }) => content.id !== removedId)
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
        <CloseIcon size={20} />
      </IconButton>
    </Tooltip>
  )
}
