import { useContext } from 'react'
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fade,
} from '@material-ui/core'
import AddFilterIcon from 'mdi-react/FilterPlusOutlineIcon'
import MessageDialogue from '../../../../../../components/message-dialogue'
import Loading from '../../../../../../components/loading'
import Autocomplete from '../../../../../../components/autocomplete'
import { context as databookContext } from '../../../../context'
import { gql, useApolloClient } from '@apollo/client'
import { WithGqlQuery } from '../../../../../../hooks'
import QuickForm from '@saeon/quick-form'

const DASHBOARDS_QUERY = gql`
  query($databookId: ID!) {
    dashboards(databookId: $databookId) {
      id
      layout
      filters {
        id
        name
        columnFiltered
        values
        sql
      }
    }
  }
`

export default ({ dashboard }) => {
  const client = useApolloClient()
  const { databook } = useContext(databookContext)
  const { _id: databookId } = databook.doc
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
        return (
          <WithGqlQuery
            QUERY={gql`
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
            `}
            variables={{ id: databookId }}
          >
            {({ error, loading, data }) => {
              if (loading) {
                return <Loading />
              }

              if (error) {
                throw error
              }

              return (
                <QuickForm error={false} selectedOption={''}>
                  {(update, { error, selectedOption }) => {
                    return (
                      <>
                        <DialogContent>
                          <DialogContentText color={error ? 'error' : 'textPrimary'}>
                            {error || 'Select a filter to add to this dashboard'}
                          </DialogContentText>
                          <Autocomplete
                            style={{ margin: '16px 0' }}
                            id={'add-filters-to-dashboard-list'}
                            options={[...data.databook.filters?.map(({ id }) => id)]}
                            setOption={selectedOption => update({ selectedOption })}
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
                                            filterId: selectedOption,
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
                                                            ? [
                                                                ...(dashboard.filters || []),
                                                                newFilter,
                                                              ]
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
            }}
          </WithGqlQuery>
        )
      }}
    </MessageDialogue>
  )
}
