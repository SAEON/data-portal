import React from 'react'
import { Typography } from '@material-ui/core'

const keys = [
  'currentVersion',
  'mapName',
  'description',
  'layers',
  'documentInfo',
  'capabilities',
  'maxRecordCount'
]

export default ({ layers }) => {
  return <Typography>{json?.layers.length}</Typography>
}
