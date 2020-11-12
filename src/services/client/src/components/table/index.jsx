import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
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
