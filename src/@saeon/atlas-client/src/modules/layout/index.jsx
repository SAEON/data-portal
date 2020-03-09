import React, { PureComponent } from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap, esriLayer } from '../../layers'

// Speed dials
import LayersSpeedDial from '../navigation/layers-speed-dial'
import SearchSpeedDial from '../navigation/search-speed-dial'
import ConfigSpeedDial from '../navigation/config-speed-dial'

const esriUrls = [
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_AveTemp_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/SA_flood_hazard_index/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Drought_tendencies_base_v2/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_vhd_v4/MapServer'
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_hwd_v3/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/GW_Recharge_Baseline_RCH_00_50_H_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Settlement_Water_Source/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Socio_Vulnerability_Grid/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Fabric_Vulnerability_Grid/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/3_PopPressureMatrix_2050M_Filled_Green/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/3_SASettelment_Pop_Grid_Med2050_RiskTool/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_m_AveTemp_50_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_m_AveTemp_50_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP85_m_aveTemp_50_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_m_rain_50_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP85_m_rain_50_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_m_rnde_50_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP85_m_rnde_50_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_m_vhd_50v6/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP85_m_vhd_50v3/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/fireDangerDays_mid_v3/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/fire_risk_settlements_2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/extreme_rainfall_mid/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Settlements_flood_risk_2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Drought_tendencies_mid_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Settlements_drought_risk_2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Settlement_coastal_flood_risk_2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/3_HeatStressMatrix_RCP85_m_B17_Anon_v2/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/3_GW_rch_change_85_50_RiskTool_v5/MapServer',
  // 'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Groundwater_PressureMatric_drch_85_50mf_v4/MapServer'
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
              terrestrisBaseMap(),
              ...esriUrls.map((uri, i) => esriLayer({ uri, title: 'esri ' + i }))
            ]}
            style={{ width: '100%', height: '100%' }}
          >
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
