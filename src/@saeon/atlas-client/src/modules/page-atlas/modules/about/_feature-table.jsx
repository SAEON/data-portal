import React from 'react'
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core'
import { Help as HelpIcon } from '@material-ui/icons'
import useStyles from './styles'
import { FeedbackContext } from '../../../provider-feedback'

const status = Object.freeze({
  planned: Symbol('planned'),
  partial: Symbol('partial'),
  complete: Symbol('complete'),
})

const createRow = (...cells) => ({
  name: cells[0],
  status: cells[1] === status.planned ? 'planned' : status.partial ? 'partial' : 'complete',
})

const rows = [
  ['WMS support', status.partial],
  ['WCS support', status.planned],
  ['WFS support', status.planned],
  ['ArcGIS Server suppport', status.partial],
  ['Download support', status.planned],
  ['Embedding support', status.planned],
  ['Embedding conf', status.planned],
  ['SAEON catalogue search', status.partial],
  ['3rd Party layer configration', status.partial],
  ['Select data by subsetting', status.planned],
  ['Deployment for SAAS', status.partial],
]

export default function DenseTable() {
  const classes = useStyles()

  return (
    <FeedbackContext.Consumer>
      {({ setInfo }) => (
        <TableContainer style={{ height: '100%' }}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .map((row) => createRow(row))
                .map((row, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      <Typography variant="overline">{row.name}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="overline">{row.status}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography variant="overline">
                        <IconButton
                          onClick={() => setInfo('Project status links not implemented yet')}
                        >
                          <HelpIcon />
                        </IconButton>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </FeedbackContext.Consumer>
  )
}
