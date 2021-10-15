import { useContext, useState } from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import { useMutation, gql } from '@apollo/client'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import chartDefinitions from '../../../../../../../components/charts'
import Autocomplete from '../../../../../../../components/autocomplete'
import { context as databookContext } from '../../../../../contexts/databook-provider'
import { context as dataContext } from '../../../../../contexts/data-provider'
import DialogueButtonLoading from '../../../../../components/loading-dialogue-button'

export default ({ setActiveTabIndex, setOpen }) => {
  const theme = useTheme()
  const { id: databookId } = useContext(databookContext)
  const { data, sql } = useContext(dataContext)
  const [chartType, setChartType] = useState('')
  const [chartTitle, setChartTitle] = useState('')
  const [chartDescription, setChartDescription] = useState('')
  const [formValues, setFormValues] = useState({})

  const [addChart, { error, loading }] = useMutation(
    gql`
      mutation createChart(
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
    {
      update: (cache, { data: freshData }) => {
        const query = gql`
          query databook($id: ID!) {
            databook(id: $id) {
              id
              charts {
                id
              }
            }
          }
        `

        const staleData = cache.read({
          query,
          variables: { id: databookId },
        })

        const charts = [...staleData.databook.charts, freshData.createChart]

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign({ ...staleData.databook }, { charts }),
          },
        })

        setOpen(false)

        /**
         * Set timeout prevents the activeTabIndex from being
         * set before the new dashboards state is updated
         *
         * It's a bit of a hack, but actually gives a nice
         * UI effect
         */
        setTimeout(() => {
          setActiveTabIndex(charts.length - 1)
        }, 100)
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <>
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
          autoComplete="off"
          style={{ marginBottom: theme.spacing(4) }}
          label="Title"
          value={chartTitle}
          onChange={e => setChartTitle(e.target.value)}
        />

        {/* CHART DESCRIPTION */}
        <TextField
          id="chart-description"
          fullWidth
          autoComplete="off"
          style={{ marginBottom: theme.spacing(4) }}
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

        <div style={{ marginBottom: theme.spacing(4) }} />

        {/* CHART CONFIG */}
        {chartType &&
          chartDefinitions
            .find(({ type }) => type === chartType)
            .config.map(({ id, Component, description }) => {
              return (
                <div key={id} style={{ marginBottom: theme.spacing(4) }}>
                  <DialogContentText>{description}</DialogContentText>
                  <Component
                    value={formValues[id]}
                    setValue={val => {
                      return setFormValues({
                        ...formValues,
                        [id]: val,
                      })
                    }}
                    data={data}
                  />
                </div>
              )
            })}
      </DialogContent>

      <DialogActions>
        {loading && <DialogueButtonLoading loading={loading} />}
        {!loading && (
          <Button
            onClick={() => {
              const saveFilter =
                chartDefinitions.find(({ type }) => type === chartType)?.saveFilter ||
                function (data) {
                  return data
                }

              addChart({
                variables: Object.assign(
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
              })
            }}
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            Create Chart
          </Button>
        )}
      </DialogActions>
    </>
  )
}
