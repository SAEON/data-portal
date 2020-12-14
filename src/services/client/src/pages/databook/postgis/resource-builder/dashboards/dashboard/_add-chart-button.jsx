import { useContext } from 'react'
import {
  Button,
  CircularProgress,
  DialogActions,
  DialogContent,
  DialogContentText,
  Fade,
} from '@material-ui/core'
import AddChartIcon from 'mdi-react/ChartBoxPlusOutlineIcon'
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
        title: 'Add chart to current dashboard',
        placement: 'bottom-start',
      }}
      title="Add chart"
      iconProps={{ size: 'small' }}
      icon={<AddChartIcon size={20} />}
    >
      {closeDialogue => {
        return (
          <WithGqlQuery
            QUERY={gql`
              query($id: ID!) {
                databook(id: $id) {
                  id
                  charts {
                    id
                    title
                    description
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
                            {error || 'Select a chart to add to this dashboard'}
                          </DialogContentText>
                          <Autocomplete
                            style={{ margin: '16px 0' }}
                            id={'add-charts-to-dashboard-list'}
                            options={[...data.databook.charts?.map(({ id }) => id)]}
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
                                            mutation($chartId: ID!, $dashboardId: ID!) {
                                              addChartToDashboard(
                                                chartId: $chartId
                                                dashboardId: $dashboardId
                                              ) {
                                                id
                                              }
                                            }
                                          `,
                                          variables: {
                                            chartId: selectedOption,
                                            dashboardId,
                                          },
                                          update: (cache, { data }) => {
                                            const { dashboards } = cache.read({
                                              query: DASHBOARDS_QUERY,
                                              variables: {
                                                databookId,
                                              },
                                            })

                                            const newChart = data.addChartToDashboard

                                            cache.writeQuery({
                                              query: DASHBOARDS_QUERY,
                                              data: {
                                                dashboards: [
                                                  ...dashboards.map(d => {
                                                    return Object.assign(
                                                      {},
                                                      { ...d },
                                                      {
                                                        layout:
                                                          d.id === dashboardId
                                                            ? [
                                                                ...(d.layout || []),
                                                                {
                                                                  content: {
                                                                    id: newChart.id,
                                                                    type: 'Chart',
                                                                  },
                                                                },
                                                              ]
                                                            : d.layout,
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
                                          update({
                                            error: error.message,
                                          })
                                        })
                                        .finally(() => {
                                          updateButton({ loading: false })
                                        })
                                    }}
                                  >
                                    Add Chart
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
