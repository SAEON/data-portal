import { useState, useContext } from 'react'
import PlusIcon from 'mdi-react/PlusIcon'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { useApolloClient, gql } from '@apollo/client'
import useTheme from '@material-ui/core/styles/useTheme'
import { context as databookContext } from '../../../contexts/databook-provider'
import { context as dataContext } from '../../../contexts/data-provider'
import Autocomplete from '../../../../../components/autocomplete'
import QuickForm from '@saeon/quick-form'

const FILTERS_QUERY = gql`
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
`
const FIELD_SPACING = 32

export default () => {
  const theme = useTheme()
  const client = useApolloClient()
  const { id: databookId } = useContext(databookContext)
  const { data } = useContext(dataContext)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState(false)
  const [filterName, setFilterName] = useState('')
  const [columnFiltered, setColumnFiltered] = useState('')

  if (!data || !data.length)
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
      <Tooltip title="Create filter from current data" placement="left-start">
        <IconButton style={{ marginLeft: 'auto' }} onClick={() => setOpen(true)} size="small">
          <PlusIcon size={14} />
        </IconButton>
      </Tooltip>

      {/* DIALOGUE */}
      <Dialog fullWidth maxWidth="sm" open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add filter to databook</DialogTitle>
        <DialogContent>
          {/* ERROR MSG */}
          {error && (
            <Typography variant="body2" style={{ color: theme.palette.error.main }}>
              {JSON.stringify(error)}
            </Typography>
          )}

          {/* FILTER NAME */}
          <TextField
            id="filter-name"
            fullWidth
            style={{ marginBottom: FIELD_SPACING }}
            label="Name"
            value={filterName}
            onChange={e => setFilterName(e.target.value)}
          />

          {/* COLUMN FILTERED */}
          <DialogContentText>Select column filtered</DialogContentText>
          <Autocomplete
            id="select-column-filtered"
            options={data ? Object.keys(data[0]) : []}
            setOption={val => {
              setColumnFiltered(val)
            }}
            selectedOptions={columnFiltered}
          />

          <div style={{ marginBottom: FIELD_SPACING }} />
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
                    try {
                      await client.mutate({
                        mutation: gql`
                          mutation(
                            $databookId: ID!
                            $name: String
                            $columnFiltered: String
                            $values: [String]
                            $sql: String
                          ) {
                            createFilter(
                              databookId: $databookId
                              name: $name
                              columnFiltered: $columnFiltered
                              values: $values
                              sql: $sql
                            ) {
                              id
                            }
                          }
                        `,
                        variables: {
                          ...Object.assign({
                            databookId,
                            name: filterName,
                            columnFiltered: columnFiltered,
                            values: [...new Set(data.map(row => String(row[columnFiltered])))], //grabbing column values and removing duplicates
                            sql: '', // TODO
                          }),
                        },
                        update: (cache, { data }) => {
                          const { databook } = cache.read({
                            query: FILTERS_QUERY,
                            variables: {
                              id: databookId,
                            },
                          })

                          cache.writeQuery({
                            query: FILTERS_QUERY,
                            variables: {
                              id: databookId,
                            },
                            data: {
                              databook: {
                                ...databook,
                                filters: [data.createFilter, ...databook.filters],
                              },
                            },
                          })
                        },
                      })
                      setOpen(false)
                    } catch (error) {
                      setError(error.message)
                      console.error(error)
                    } finally {
                      update({ loading: false })
                    }
                  }}
                  size="small"
                  variant="contained"
                  color="primary"
                  disableElevation
                >
                  Create Filter
                </Button>
              )
            }}
          </QuickForm>
        </DialogActions>
      </Dialog>
    </>
  )
}
