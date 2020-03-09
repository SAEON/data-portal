import React, { PureComponent } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap } from '../../layers'

// Speed dials
import LayersSpeedDial from '../navigation/layers-speed-dial'
import SearchSpeedDial from '../navigation/search-speed-dial'
import ConfigSpeedDial from '../navigation/config-speed-dial'

export default class extends PureComponent {
  render() {
    return (
      <>
        <AppBar variant="outlined" position="static">
          <Toolbar disableGutters={false} variant="dense">
            <Typography style={{ padding: '10px' }} display="block" variant="body2">
              SAEON Atlas
            </Typography>
          </Toolbar>
        </AppBar>
        <div style={{ height: 'calc(100% - 54px)', width: '100%' }}>
          <OlReact layers={[terrestrisBaseMap()]} style={{ width: '100%', height: '100%' }}>
            {({ map }) => (
              <MapProxy map={map}>
                {({ proxy }) => (
                  <>
                    <SearchSpeedDial proxy={proxy} />
                    <LayersSpeedDial proxy={proxy} />
                    <ConfigSpeedDial proxy={proxy} />
                  </>
                )}
              </MapProxy>
            )}
          </OlReact>
        </div>
      </>
    )
  }
}
