import React, { PureComponent } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap, esriLayer } from '../ol'
import { LayersModule, SearchModule, AppConfiguration } from './app-modules'

const esriUrls = [
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_AveTemp_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/SA_flood_hazard_index/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Drought_tendencies_base_v2/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_vhd_v4/MapServer'
]

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
        <div style={{ height: 'calc(100% - 42px)', width: '100%' }}>
          <OlReact
            layers={[
              ...esriUrls.map((uri, i) => esriLayer({ uri, title: 'esri ' + i })),
              terrestrisBaseMap()
            ]}
            style={{ width: '100%', height: '100%' }}
          >
            {({ map }) => (
              <MapProxy map={map}>
                {({ proxy }) => (
                  <>
                    <LayersModule proxy={proxy} />
                    <SearchModule proxy={proxy} />
                    <AppConfiguration proxy={proxy} />
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
