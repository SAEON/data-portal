import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import useStyles from './style'
import hash from 'object-hash'

/**
 * Assumes PostGIS data object results
 */
export default ({ data }) => {
  const classes = useStyles()
  if (!data || !data.length) return 'no data'

  const headers = Object.fromEntries(Object.keys(data[0]).map((name, i) => [name, i]))

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="Query results data">
        <TableHead>
          <TableRow>
            {Object.entries(headers)
              .sort(([, aKey], [, bKey]) => (aKey > bKey ? 1 : -1))
              .map(([name]) => {
                return <TableCell key={name}>{name}</TableCell>
              })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => {
            const _row = []

            Object.entries(row).forEach(([name, value]) => (_row[headers[name]] = value))

            return (
              <TableRow key={hash(row)}>
                {_row.map(value => (
                  <TableCell key={value}>{value}</TableCell>
                ))}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
