import { useState, useContext } from 'react'
import AddItemIcon from 'mdi-react/ViewGridAddIcon'
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
} from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client'
import { useTheme } from '@material-ui/core/styles'
import { context as databookContext } from '../../../context'

const choices = ['LENGTH', 'FNODE_']

export default ({ data }) => {
  const { databook, sql } = useContext(databookContext)
  const [open, setOpen] = useState(false)
  const [x, setX] = useState(choices[0])
  const [y, setY] = useState(choices[1])
  const [mutationLoading, setMutationLoading] = useState(false)
  const client = useApolloClient()
  const id = databook.doc._id

  const theme = useTheme()
  return (
    <>
      {/* TOGGLE DIALOGUE */}
      <Tooltip title="Create chart from current data" placement="left-start">
        <IconButton style={{ marginLeft: 'auto' }} onClick={() => setOpen(true)} size="small">
          <AddItemIcon style={{ color: theme.palette.primary.light }} />
        </IconButton>
      </Tooltip>

      {/* DIALOGUE */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add chart to dashboard</DialogTitle>

        <FormControl>
          <InputLabel id="x-axis">X axis</InputLabel>
          <Select labelId="x-axis" id="x-axis" value={x} onChange={val => setX(val)}>
            {choices.map(choice => (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="y-axis">X axis</InputLabel>
          <Select labelId="y-axis" id="y-axis" value={y} onChange={val => setY(val)}>
            {choices.map(choice => (
              <MenuItem key={choice} value={choice}>
                {choice}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DialogActions>
          <Button
            onClick={async () => {
              setMutationLoading(true)
              await client.mutate({
                mutation: gql`
                  mutation(
                    $databookId: ID!
                    $name: String
                    $data: JSON!
                    $xAxis: String!
                    $yAxis: String!
                    $sql: String!
                  ) {
                    createChart(
                      name: $name
                      databookId: $databookId
                      data: $data
                      xAxis: $xAxis
                      yAxis: $yAxis
                      sql: $sql
                    ) {
                      id
                    }
                  }
                `,
                variables: {
                  databookId: id,
                  name: 'test',
                  data: data,
                  xAxis: x,
                  yAxis: y,
                  sql,
                },
              })

              setMutationLoading(false)
              setOpen(false)
            }}
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
