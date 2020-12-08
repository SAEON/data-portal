import { useState, useContext } from 'react'
import CreateChartIcon from 'mdi-react/ChartBoxPlusOutlineIcon'
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Tooltip,
  DialogContent,
  DialogContentText,
  CircularProgress,
  TextField,
} from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client'
import { useTheme } from '@material-ui/core/styles'
import { context as databookContext } from '../../../context'
import chartDefinitions from '../../../../../components/charts'
import Autocomplete from '../../../../../components/autocomplete'
import QuickForm from '@saeon/quick-form'

const CHARTS_QUERY = gql`
  query($id: ID!) {
    databook(id: $id) {
      id
      charts {
        id
        title
      }
    }
  }
`

const FIELD_SPACING = 32

export default ({ data }) => {
  const theme = useTheme()
  const client = useApolloClient()
  const { databook, sql } = useContext(databookContext)
  const databookId = databook.doc._id

  const [open, setOpen] = useState(false)
  const [chartType, setChartType] = useState('')
  const [chartTitle, setChartTitle] = useState('')
  const [chartDescription, setChartDescription] = useState('')
  const [formValues, setFormValues] = useState({})

  return (
    <>
      {/* TOGGLE DIALOGUE */}
      <Tooltip title="Create chart from current data" placement="left-start">
        <IconButton style={{ marginLeft: 'auto' }} onClick={() => setOpen(true)} size="small">
          <CreateChartIcon style={{ color: theme.palette.primary.light }} />
        </IconButton>
      </Tooltip>

      {/* DIALOGUE */}
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add chart to dashboard</DialogTitle>
        <DialogContent>
          {/* CHART TITLE */}
          <TextField
            id="chart-title"
            fullWidth
            style={{ marginBottom: FIELD_SPACING }}
            label="Title"
            value={chartTitle}
            onChange={e => setChartTitle(e.target.value)}
          />

          {/* CHART DESCRIPTION */}
          <TextField
            id="chart-description"
            fullWidth
            style={{ marginBottom: FIELD_SPACING }}
            label="Description"
            value={chartDescription}
            onChange={e => setChartDescription(e.target.value)}
          />

          {/* CHART TYPE */}
          <DialogContentText>Select chart type</DialogContentText>
          <Autocomplete
            id="select-chart-type"
            options={chartDefinitions.map(({ type }) => type)}
            setOption={val => setChartType(val)}
            selectedOptions={chartType}
          />

          <div style={{ marginBottom: FIELD_SPACING }} />

          {/* CHART CONFIG */}
          {chartType &&
            chartDefinitions
              .find(({ type }) => type === chartType)
              .config.map(({ id, Component, description }) => {
                return (
                  <div key={id} style={{ marginBottom: FIELD_SPACING }}>
                    <DialogContentText>{description}</DialogContentText>
                    <Component
                      value={formValues[id]}
                      setValue={val =>
                        setFormValues({
                          ...formValues,
                          [id]: val,
                        })
                      }
                      data={data}
                    />
                  </div>
                )
              })}
        </DialogContent>

        <DialogActions>
          <QuickForm loading={false}>
            {(update, { loading }) => {
              if (loading) {
                return (
                  <div style={{ margin: '0 16px 6px 0' }}>
                    <CircularProgress thickness={2} size={18} />
                  </div>
                )
              }

              return (
                <Button
                  onClick={async () => {
                    update({ loading: true })
                    const saveFilter =
                      chartDefinitions.find(({ type }) => type === chartType).saveFilter ||
                      function (data) {
                        return data
                      }

                    await client.mutate({
                      mutation: gql`
                        mutation(
                          $databookId: ID!
                          $title: String
                          $description: String
                          $data: JSON!
                          $config: JSON!
                          $sql: String!
                          $type: ChartType!
                        ) {
                          createChart(
                            databookId: $databookId
                            title: $title
                            description: $description
                            type: $type
                            data: $data
                            config: $config
                            sql: $sql
                          ) {
                            id
                          }
                        }
                      `,
                      variables: {
                        ...Object.assign(
                          {
                            type: chartType,
                            title: chartTitle,
                            description: chartDescription,
                            databookId,
                            data: saveFilter(data, formValues),
                            sql,
                          },
                          { config: formValues }
                        ),
                      },
                      update: (cache, { data }) => {
                        const { databook } = cache.read({
                          query: CHARTS_QUERY,
                          variables: {
                            id: databookId,
                          },
                        })

                        cache.writeQuery({
                          query: CHARTS_QUERY,
                          variables: {
                            id: databookId,
                          },
                          data: {
                            databook: {
                              ...databook,
                              charts: [data.createChart, ...databook.charts],
                            },
                          },
                        })
                      },
                    })
                    update({ loading: false })
                    setOpen(false)
                  }}
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Create Chart
                </Button>
              )
            }}
          </QuickForm>
        </DialogActions>
      </Dialog>
    </>
  )
}
