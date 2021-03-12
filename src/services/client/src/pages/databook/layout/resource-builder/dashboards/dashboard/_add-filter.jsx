import { useContext } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Fade from '@material-ui/core/Fade'
import AddFilterIcon from 'mdi-react/FilterPlusOutlineIcon'
import MessageDialogue from '../../../../../../components/message-dialogue'
import Loading from '../../../../../../components/loading'
import Autocomplete from '../../../../../../components/autocomplete'
import { context as databookContext } from '../../../../contexts/databook-provider'
import { gql, useApolloClient, useQuery } from '@apollo/client'
import QuickForm from '@saeon/quick-form'

const DASHBOARDS_QUERY = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      layout
      filters
    }
  }
`

const CloseButton = ({ id }) => {
  const { error, loading, data } = useQuery(
    gql`
      query($id: ID!) {
        databook(id: $id) {
          id
          filters {
            id
            name
            columnFiltered
            values
            sql
          }
        }
      }
    `,
    { variables: { id } }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  return (
    <QuickForm error={false} selectedOption={''} selectedId={''}>
      {(update, { error, selectedOption, selectedId }) => {
        return (
          <>
            <DialogContent>
              <DialogContentText color={error ? 'error' : 'textPrimary'}>
                {error || 'Select a filter to add to this dashboard'}
              </DialogContentText>
              <Autocomplete
                style={{ margin: '16px 0' }}
                id={'add-filters-to-dashboard-list'}
                options={[...data.databook.filters.map(({ id, name }) => name || id)]}
                setOption={(selectedOption, i) => {
                  update({ selectedOption, selectedId: data.databook.filters[i].id })
                }}
                selectedOptions={selectedOption}
              />
            </DialogContent>
            <DialogActions>
              <QuickForm loading={false}>
                {(updateButton, { loading }) => {
                  if (loading) {
                    return (
                      <Fade in={loading} key={'show-loading'}>
                        <div style={{ margin: '0 16px 8px 0' }}>
                          <CircularProgress thickness={2} size={18} />
                        </div>
                      </Fade>
                    )
                  }

                  return (
                    <Fade in={!loading} key={'show-button'}>
                      <Button
                        disabled={!selectedOption}
                        size="small"
                        color="primary"
                        disableElevation
                        variant="contained"
                        onClick={async () => {
                          updateButton({ loading: true })
                          await client
                            .mutate({
                              mutation: gql`
                                mutation($filterId: ID!, $dashboardId: ID!) {
                                  addFilterToDashboard(
                                    filterId: $filterId
                                    dashboardId: $dashboardId
                                  ) {
                                    id
                                    name
                                    columnFiltered
                                    values
                                    sql
                                  }
                                }
                              `,
                              variables: {
                                filterId: selectedId,
                                dashboardId,
                              },
                              update: (cache, { data }) => {
                                const { dashboards } = cache.read({
                                  query: DASHBOARDS_QUERY,
                                  variables: {
                                    databookId,
                                  },
                                })

                                const newFilter = data.addFilterToDashboard

                                cache.writeQuery({
                                  query: DASHBOARDS_QUERY,
                                  data: {
                                    dashboards: [
                                      ...dashboards.map(dashboard => {
                                        return Object.assign(
                                          {},
                                          { ...dashboard },
                                          {
                                            filters:
                                              dashboard.id === dashboardId
                                                ? [...(dashboard.filters || []), newFilter]
                                                : dashboard.filters,
                                          }
                                        )
                                      }),
                                    ],
                                  },
                                })
                              },
                            })
                            .then(() => {
                              closeDialogue()
                            })
                            .catch(error => {
                              console.error(error)
                              update({
                                error: error.message,
                              })
                            })
                            .finally(() => {
                              updateButton({ loading: false })
                            })
                        }}
                      >
                        Add Filter
                      </Button>
                    </Fade>
                  )
                }}
              </QuickForm>
            </DialogActions>
          </>
        )
      }}
    </QuickForm>
  )
}

export default ({ dashboard }) => {
  const client = useApolloClient()
  const { id: databookId } = useContext(databookContext)
  const { id: dashboardId } = dashboard

  return (
    <MessageDialogue
      tooltipProps={{
        title: 'Add filter to current dashboard',
        placement: 'bottom-start',
      }}
      title="Add filter"
      iconProps={{ size: 'small' }}
      icon={<AddFilterIcon size={20} />}
    >
      {closeDialogue => {
        return <CloseButton id={databookId} />
      }}
    </MessageDialogue>
  )
}
