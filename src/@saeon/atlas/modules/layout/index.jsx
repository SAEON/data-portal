import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import OlReact from '../../../ol-react'
import { ahocevarBaseMap } from '../../layers'
import SpeedMenu from '../speed-menu'

export default () => (
  <>
    <AppBar position="static">
      <Toolbar disableGutters={false} variant="dense">
        SAEON Atlas
      </Toolbar>
    </AppBar>
    <div style={{ height: 'calc(100% - 48px)', width: '100%' }}>
      <OlReact layers={[ahocevarBaseMap()]} style={{ width: '100%', height: '100%' }}>
        {({ map }) => <SpeedMenu map={map} />}
      </OlReact>
    </div>
  </>
)
