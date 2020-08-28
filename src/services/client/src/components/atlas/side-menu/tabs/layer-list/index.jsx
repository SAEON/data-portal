import React from 'react'
import DataLayers from './data-layers'
import BaseLayers from './base-layers'
import { Typography, Box } from '@material-ui/core'

export default () => {
  return (
    <>
      <Box m={1}>
        <Typography variant="overline">Data Layers</Typography>
        <DataLayers />
      </Box>
      <Box m={1}>
        <Typography variant="overline">Base Layers</Typography>
        <BaseLayers />
      </Box>
    </>
  )
}
