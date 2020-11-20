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
} from '@material-ui/core'
import { useApolloClient, gql } from '@apollo/client'
import { useTheme } from '@material-ui/core/styles'
import { context as databookContext } from '../../../context'

export default () => {
  const { databook } = useContext(databookContext)
  const [open, setOpen] = useState(false)
  const [mutationLoading, setMutationLoading] = useState(false)
  const client = useApolloClient()
  const id = databook.doc._id

  console.log(id)

  const theme = useTheme()
  return (
    <>
      {/* TOGGLE DIALOGUE */}
      <Tooltip title="Create chart from current data" placement="left-start">
        <IconButton onClick={() => setOpen(true)} size="small">
          <AddItemIcon style={{ color: theme.palette.primary.light }} />
        </IconButton>
      </Tooltip>

      {/* DIALOGUE */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add chart to dashboard</DialogTitle>
        <DialogContent>{mutationLoading && 'loading'}</DialogContent>
        <DialogActions>
          <Button
            onClick={async () => {
              setMutationLoading(true)
              await client.mutate({
                mutation: gql`
                  mutation($id: ID!, $name: String) {
                    browserClient {
                      databook(id: $id) {
                        createChart(name: $name) {
                          id
                        }
                      }
                    }
                  }
                `,
                variables: {
                  id,
                  name: 'test',
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
