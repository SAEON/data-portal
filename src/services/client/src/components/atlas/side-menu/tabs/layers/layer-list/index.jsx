import React from 'react'
import ActiveLayers from './active-layers'
import { Typography, Box, Tooltip, IconButton } from '@material-ui/core'
import { Add as AddIcon } from '@material-ui/icons'

export default () => {
  return (
    <>
      <Box m={1}>
        <Typography variant="overline">Active Layers</Typography>
        <ActiveLayers />
        <Tooltip placement="right" title="Add layer via server address">
          <IconButton
            onClick={() =>
              alert('Users will be able to add external layers (GeoServer or Esri) to the map')
            }
            style={{ float: 'right' }}
            size="small"
          >
            <AddIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <div style={{ clear: 'both' }} />
      </Box>
    </>
  )
}
