import { useContext } from 'react'
import { useApolloClient, gql } from '@apollo/client'
import { IconButton, Tooltip } from '@material-ui/core'
import CloseIcon from 'mdi-react/CloseIcon'
import { context as databookContext } from '../../../../../context'

const DASHBOARDS = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      layout
      filters
    }
  }
`

//STEVEN TO-DO: performance of remove onClick needs work, though it may largely be local ram shortage
export default ({ filterId, dashboard }) => {
  const { databook } = useContext(databookContext)
  const client = useApolloClient()
  return (
    <Tooltip title="Remove filter from this dashboard">
      <IconButton
        size="small"
        onClick={() => {
          client.mutate({
            mutation: gql`
              mutation($filterId: ID!, $dashboardId: ID!) {
                removeFilterFromDashboard(filterId: $filterId, dashboardId: $dashboardId) {
                  id
                }
              }
            `,
            variables: { filterId, dashboardId: dashboard.id },
            update: (cache, { data }) => {
              const { dashboards } = cache.read({
                query: DASHBOARDS,
                variables: {
                  databookId: databook.doc._id,
                },
              })

              const { id: removedId } = data.removeFilterFromDashboard

              const updatedDashboards = [...dashboards].map(item => {
                item = { ...item }
                if (item.id === dashboard.id) {
                  item.filters = item.filters.filter(id => id !== removedId)
                }
                return item
              })

              cache.writeQuery({
                query: DASHBOARDS,
                data: { dashboards: updatedDashboards },
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
