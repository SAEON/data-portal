import { useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import CloseIcon from 'mdi-react/CloseIcon'
import { context as databookContext } from '../../../../../../contexts/databook-provider'
import LoadingButton from '../../../../../../components/loading-dialogue-button'
import Fade from '@material-ui/core/Fade'

export default ({ filterId, dashboardId }) => {
  const { id: databookId } = useContext(databookContext)

  const [removeFilter, { error, loading }] = useMutation(
    gql`
      mutation removeFilter($filterId: ID!, $dashboardId: ID!) {
        dashboard(id: $dashboardId) {
          id
          removeFilter(id: $filterId) {
            id
            filters {
              id
            }
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
                filters {
                  id
                }
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
                  id === dashboardId ? freshData.dashboard.removeFilter : { id }
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
        <Tooltip title="Remove filter from this dashboard">
          <IconButton
            size="small"
            onClick={() =>
              removeFilter({
                variables: {
                  filterId,
                  dashboardId,
                },
              })
            }
          >
            <CloseIcon size={20} />
          </IconButton>
        </Tooltip>
      </Fade>
    </>
  )
}
