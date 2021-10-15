import { useContext } from 'react'
import DeleteIcon from 'mdi-react/CloseIcon'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import Fade from '@mui/material/Fade'
import { useMutation, gql } from '@apollo/client'
import { context as databookContext } from '../../../../../../../contexts/databook-provider'
import LoadingButton from '../../../../../../../components/loading-dialogue-button'

export default ({ chartId, dashboardId }) => {
  const { id: databookId } = useContext(databookContext)

  const [removeChart, { error, loading }] = useMutation(
    gql`
      mutation removeChart($chartId: ID!, $dashboardId: ID!) {
        dashboard(id: $dashboardId) {
          id
          removeChart(id: $chartId) {
            id
            layout
          }
        }
      }
    `,
    {
      update: (cache, { data: freshData }) => {
        const query = gql`
          query databook($id: ID!) {
            databook(id: $id) {
              id
              dashboards {
                id
                layout
              }
            }
          }
        `

        const staleData = cache.read({
          query,
          variables: {
            id: databookId,
          },
        })

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign(
              { ...staleData.databook },
              {
                dashboards: staleData.databook.dashboards.map(({ id }) =>
                  id === dashboardId ? freshData.dashboard.removeChart : { id }
                ),
              }
            ),
          },
        })
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <>
      <LoadingButton loading={loading} />
      <Fade key="button-in" in={!loading}>
        <Tooltip title="Remove chart from this dashboard">
          <IconButton
            onClick={() => removeChart({ variables: { chartId, dashboardId } })}
            color="inherit"
            size="small"
            style={{ marginLeft: 'auto' }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Fade>
    </>
  )
}
