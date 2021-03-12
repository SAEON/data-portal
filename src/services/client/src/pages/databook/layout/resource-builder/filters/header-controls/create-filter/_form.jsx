import { useState, useContext } from 'react'
import Autocomplete from '../../../../../../../components/autocomplete'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import { useMutation, gql } from '@apollo/client'
import CircularProgress from '@material-ui/core/CircularProgress'
import { context as dataContext } from '../../../../../contexts/data-provider'
import { context as databookContext } from '../../../../../contexts/databook-provider'
import useTheme from '@material-ui/core/styles/useTheme'
import Fade from '@material-ui/core/Fade'

export default ({ setActiveTabIndex, setOpen }) => {
  const theme = useTheme()
  const [filterName, setFilterName] = useState('')
  const [columnFiltered, setColumnFiltered] = useState('')
  const { id: databookId } = useContext(databookContext)
  const { data, sql } = useContext(dataContext)

  const [addFilter, { error, loading }] = useMutation(
    gql`
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
    {
      update: (cache, { data: freshData }) => {
        const query = gql`
          query databook($id: ID!) {
            databook(id: $id) {
              id
              filters {
                id
              }
            }
          }
        `

        const staleData = cache.read({
          query,
          variables: { id: databookId },
        })

        const filters = [...staleData.databook.filters, freshData.createFilter]

        cache.writeQuery({
          query,
          data: {
            databook: Object.assign({ ...staleData.databook }, { filters }),
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
          setActiveTabIndex(filters.length - 1)
        }, 100)
      },
    }
  )

  if (error) {
    throw error
  }

  return (
    <>
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
          autoComplete="off"
          style={{ marginBottom: theme.spacing(4) }}
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

        <div style={{ marginBottom: theme.spacing(4) }} />
      </DialogContent>

      <DialogActions>
        {loading && (
          <Fade in={loading} key={'loading-in'}>
            <div
              style={{ display: 'flex', margin: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0` }}
            >
              <CircularProgress thickness={2} size={22} />
            </div>
          </Fade>
        )}
        {!loading && (
          <Button
            onClick={() => {
              addFilter({
                variables: {
                  databookId,
                  name: filterName,
                  columnFiltered: columnFiltered,
                  values: [...new Set(data.map(row => String(row[columnFiltered])))],
                  sql,
                },
              })
            }}
            size="small"
            variant="contained"
            color="primary"
            disableElevation
          >
            Create Filter
          </Button>
        )}
      </DialogActions>
    </>
  )
}
