import { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import Autocomplete from '../../../../../../../../components/autocomplete'
import Button from '@material-ui/core/Button'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { context as databookContext } from '../../../../../../contexts/databook-provider'
import Fade from '@material-ui/core/Fade'
import LoadingDialogueButton from '../../../../../../components/loading-dialogue-button'

export default ({ closeDialogueFn, dashboardId, filters }) => {
  const { id: databookId } = useContext(databookContext)
  const [selectedFilter, setSelectedFilter] = useState({
    id: '',
    name: '',
  })

  const [addFilter, { loading, error }] = useMutation(
    gql`
      mutation dashboards($filterId: ID!, $dashboardId: ID!) {
        dashboard(id: $dashboardId) {
          id
          addFilter(id: $filterId) {
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
          variables: { id: databookId },
        })

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign(
              { ...staleData.databook },
              {
                dashboards: staleData.databook.dashboards.map(({ id }) =>
                  id === dashboardId ? freshData.dashboard.addFilter : { id }
                ),
              }
            ),
          },
        })

        closeDialogueFn()
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <>
      <DialogContent>
        <DialogContentText color={error ? 'error' : 'textPrimary'}>
          {error || 'Select a filter to add to this dashboard'}
        </DialogContentText>
        <Autocomplete
          style={{ margin: '16px 0' }}
          id={'add-filters-to-dashboard-list'}
          options={[...filters.map(({ id, name }) => name || id)]}
          setOption={(_, i) => setSelectedFilter(filters[i])}
          selectedOptions={selectedFilter.name || selectedFilter.id}
        />
      </DialogContent>
      <DialogActions>
        <LoadingDialogueButton loading={loading} />
        <Fade in={!loading} key={'show-button'}>
          <Button
            disabled={!selectedFilter}
            size="small"
            color="primary"
            disableElevation
            variant="contained"
            onClick={() =>
              addFilter({
                variables: {
                  filterId: selectedFilter.id,
                  dashboardId,
                },
              })
            }
          >
            Add Filter
          </Button>
        </Fade>
      </DialogActions>
    </>
  )
}
