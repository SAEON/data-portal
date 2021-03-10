import { useContext } from 'react'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Fade from '@material-ui/core/Fade'
import AddChartIcon from 'mdi-react/ChartBoxPlusOutlineIcon'
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
    }
  }
`

const CloseButton = ({ id }) => {
  const { error, loading, data } = useQuery(
    gql`
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
                {error || 'Select a chart to add to this dashboard'}
              </DialogContentText>
              <Autocomplete
                style={{ margin: '16px 0' }}
                id={'add-charts-to-dashboard-list'}
                options={[...data.databook.charts?.map(({ id, title }) => title || id)]}
                setOption={(selectedOption, i) => {
                  update({ selectedOption, selectedId: data.databook.charts[i].id })
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
                                chartId: selectedId,
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
}

export default ({ dashboard }) => {
  const client = useApolloClient()
  const { databook } = useContext(databookContext)
  const { _id: databookId } = databook
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
        return <CloseButton id={databookId} />
      }}
    </MessageDialogue>
  )
}
