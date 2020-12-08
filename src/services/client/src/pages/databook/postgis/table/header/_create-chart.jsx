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
} from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client'
import { useTheme } from '@material-ui/core/styles'
import { context as databookContext } from '../../../context'
import chartDefinitions from '../../../../../components/charts'
import Autocomplete from '../../../../../components/autocomplete'

const CHARTS_QUERY = gql`
  query($id: ID!) {
    databook(id: $id) {
      id
      charts {
        id
        name
      }
    }
  }
`

export default ({ data }) => {
  const theme = useTheme()
  const client = useApolloClient()
  const { databook, sql } = useContext(databookContext)
  const id = databook.doc._id

  const [open, setOpen] = useState(false)
  const [chartType, setChartType] = useState('')
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
          {/* CHART TYPE */}
          <DialogContentText>Select chart type</DialogContentText>
          <Autocomplete
            id="select-chart-type"
            options={chartDefinitions.map(({ type }) => type)}
            setOption={val => setChartType(val)}
            selectedOptions={chartType}
          />

          {/* CHART CONFIG */}
          {chartType &&
            chartDefinitions
              .find(({ type }) => type === chartType)
              .form.map(({ Component, description }, i) => {
                return (
                  <div key={i} style={{ marginTop: 16 }}>
                    <DialogContentText>{description}</DialogContentText>
                    <Component data={data} />
                  </div>
                )
              })}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={undefined}
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            Create Chart
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
