import React from 'react'
import Row from '../_row'
import { Typography } from '@material-ui/core'
import { format } from 'date-fns'

export default ({ dates }) => (
  <Row title="Temporal coverage">
    <Typography variant="body2">
      {Object.entries(dates.find(({ dateType: t }) => t.toUpperCase() === 'VALID'))
        .map(([key, value]) => (key !== 'dateType' ? [key, value] : undefined))
        .filter(_ => _)
        .sort(({ gte }) => (gte ? -1 : 1))
        .map(([, dtString]) => format(new Date(dtString), 'yyy-MM-dd').replace(/-/g, '/'))
        .join(' - ')}
    </Typography>
  </Row>
)
