import { useState, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import Autocomplete from '../../../../../../../../components/autocomplete'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import Fade from '@mui/material/Fade'
import { context as databookContext } from '../../../../../../contexts/databook-provider'
import LoadingDialogueButton from '../../../../../../components/loading-dialogue-button'

export default ({ closeDialogueFn, dashboardId, charts }) => {
  const { id: databookId } = useContext(databookContext)
  const [selectedChart, setSelectedChart] = useState({
    id: '',
    title: '',
  })
  const [addChart, { loading, error }] = useMutation(
    gql`
      mutation dashboards($chartId: ID!, $dashboardId: ID!) {
        dashboard(id: $dashboardId) {
          id
          addChart(id: $chartId) {
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
          variables: { id: databookId },
        })

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign(
              { ...staleData.databook },
              {
                dashboards: staleData.databook.dashboards.map(({ id }) =>
                  id === dashboardId ? freshData.dashboard.addChart : { id }
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
          {error || 'Select a chart to add to this dashboard'}
        </DialogContentText>
        <Autocomplete
          style={{ margin: '16px 0' }}
          id={'add-charts-to-dashboard-list'}
          options={[...charts.map(({ title, id }) => title || id)]} // Options is a list of titles
          setOption={(_, i) => setSelectedChart(charts[i])}
          selectedOptions={selectedChart.title || selectedChart.id}
        />
      </DialogContent>
      <DialogActions>
        <LoadingDialogueButton loading={loading} />
        <Fade in={!loading} key={'show-button'}>
          <span>
            <Button
              disabled={!selectedChart}
              size="small"
              color="primary"
              disableElevation
              variant="contained"
              onClick={() =>
                addChart({
                  variables: {
                    chartId: selectedChart.id,
                    dashboardId,
                  },
                })
              }
            >
              Add Chart
            </Button>
          </span>
        </Fade>
      </DialogActions>
    </>
  )
}
