import { useContext } from 'react'
import { useMutation, gql } from '@apollo/client'
import { useTheme } from '@mui/material/styles'
import { context as databookContext } from '../../../../../../contexts/databook-provider'
import LoadingButton from '../../../../../../components/loading-dialogue-button'
import Chip from '@mui/material/Chip'
import Fade from '@mui/material/Fade'
import Typography from '@mui/material/Typography'

export default ({ id: filterId, name, dashboardId }) => {
  const theme = useTheme()
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
    <Chip
      style={{ marginLeft: theme.spacing(1) }}
      size="small"
      color="primary"
      onDelete={() =>
        removeFilter({
          variables: {
            filterId,
            dashboardId,
          },
        })
      }
      label={
        <>
          {loading && <LoadingButton loading={loading} />}
          {!loading && (
            <Fade key="button-in" in={!loading}>
              <span>
                <Typography variant="overline" style={{ margin: 0, padding: 0, fontSize: 12 }}>
                  {name || filterId}
                </Typography>
              </span>
            </Fade>
          )}
        </>
      }
    />
  )
}
