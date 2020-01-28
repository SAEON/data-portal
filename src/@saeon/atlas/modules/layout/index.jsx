import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import OlReact from '../../../ol-react'
import { ahocevarBaseMap } from '../../layers'
import SpeedMenu from '../speed-menu'
import Typography from '@material-ui/core/Typography'

export default () => (
  <>
    <AppBar variant="outlined" position="static">
      <Toolbar disableGutters={false} variant="dense">
        <Typography style={{ padding: '10px' }} display="block" variant="h6">
          SAEON Atlas
        </Typography>
      </Toolbar>
    </AppBar>
    <div style={{ height: 'calc(100% - 48px)', width: '100%' }}>
      <OlReact layers={[ahocevarBaseMap()]} style={{ width: '100%', height: '100%' }}>
        {({ map }) => <SpeedMenu map={map} />}
      </OlReact>
    </div>
  </>
)
