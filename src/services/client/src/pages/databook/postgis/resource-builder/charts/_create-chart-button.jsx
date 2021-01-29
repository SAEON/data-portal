import { useState, useContext } from 'react'
import PlusIcon from 'mdi-react/PlusIcon' //mdi-react/PlusIcon
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
  Typography,
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

export default () => {
  const theme = useTheme()
  const client = useApolloClient()
  const { databook, sql, data } = useContext(databookContext)
  const databookId = databook.doc._id

  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [chartType, setChartType] = useState('')
  const [chartTitle, setChartTitle] = useState('')
  const [chartDescription, setChartDescription] = useState('')
  const [formValues, setFormValues] = useState({})
  if (data.rows.length === 0)
    return (
      <Tooltip title="Requires available data" placement="left-start">
        <span>
          <IconButton style={{ marginLeft: 'auto' }} size="small" disabled>
            <PlusIcon size={14} />
          </IconButton>
        </span>
      </Tooltip>
    )
  return (
    <>
      {/* TOGGLE DIALOGUE */}
      <Tooltip title="Create chart from current data" placement="left-start">
        <IconButton style={{ marginLeft: 'auto' }} onClick={() => setOpen(true)} size="small">
          <PlusIcon size={14} />
        </IconButton>
      </Tooltip>

      {/* DIALOGUE */}
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add chart to databook</DialogTitle>
        <DialogContent>
          {/* ERROR MSG */}
          {error && (
            <Typography variant="body2" style={{ color: theme.palette.error.main }}>
              {JSON.stringify(error)}
            </Typography>
          )}

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
                      setValue={val => {
                        return setFormValues({
                          ...formValues,
                          [id]: val,
                        })
                      }}
                      data={data.rows}
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
                      chartDefinitions.find(({ type }) => type === chartType)?.saveFilter ||
                      function (data) {
                        return data
                      }
                    try {
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
                              data: saveFilter(data.rows, formValues),
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
                      setOpen(false)
                    } catch (error) {
                      console.error(error)
                      setError(error.message)
                    } finally {
                      update({ loading: false })
                    }
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