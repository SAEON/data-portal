import React, { PureComponent } from 'react'
import { AppBar, Toolbar, Typography, Avatar } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap, esriLayer } from '../../lib/ol'
import { NavigationDial, navItem } from './_navigation'
import { SaeonSearch, LayerManager } from '..'
import {
  Settings as SettingsIcon,
  BeachAccess as BeachAccessIcon,
  Search as SearchIcon,
  Layers as LayersIcon,
  List as ListIcon,
  BarChart as BarChartIcon
} from '@material-ui/icons'
import { DragMenu } from '../../components'

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
                    {/* Search SpeedDial menu */}
                    <NavigationDial
                      direction={'left'}
                      icon={<SearchIcon />}
                      searchSaeonOpen={false}
                      searchCGISOpen={false}
                      style={{ position: 'absolute', right: 20, top: 57 }}
                    >
                      {(toggle, { searchSaeonOpen, searchCGISOpen }) => [
                        navItem({
                          icon: <Avatar>S</Avatar>,
                          tooltip: 'Saerch SAEON data',
                          toggle: () => toggle({ searchSaeonOpen: !searchSaeonOpen }),
                          title: 'Search SAEON data',
                          active: searchSaeonOpen,
                          Component: (
                            <DragMenu
                              title={'Search SAEON data'}
                              active={searchSaeonOpen}
                              close={() => toggle({ searchSaeonOpen: false })}
                            >
                              {(height, width) => (
                                <SaeonSearch proxy={proxy} height={height} width={width} />
                              )}
                            </DragMenu>
                          )
                        }),
                        navItem({
                          icon: <Avatar>C</Avatar>,
                          tooltip: 'Saerch CGIS data',
                          toggle: () => toggle({ searchCGISOpen: !searchCGISOpen }),
                          title: 'Search SAEON data',
                          active: searchCGISOpen,
                          Component: (
                            <DragMenu
                              title={'Search SAEON data'}
                              active={searchCGISOpen}
                              close={() => toggle({ searchCGISOpen: false })}
                            >
                              {(height, width) => 'TODO'}
                            </DragMenu>
                          )
                        })
                      ]}
                    </NavigationDial>

                    {/* Layers SpeedDial menu */}
                    <NavigationDial
                      direction={'left'}
                      icon={<LayersIcon />}
                      layerMenuOpen={false}
                      chartMenuOpen={false}
                      style={{ position: 'absolute', right: 20, top: 127 }}
                    >
                      {(toggle, { layerMenuOpen, chartMenuOpen }) => [
                        navItem({
                          icon: <ListIcon />,
                          tooltip: 'Layers menu',
                          toggle: () => toggle({ layerMenuOpen: !layerMenuOpen }),
                          Component: (
                            <DragMenu
                              title={'Open layers menu'}
                              active={layerMenuOpen}
                              close={() => toggle({ layerMenuOpen: false })}
                            >
                              {() => <LayerManager layersActive={layerMenuOpen} proxy={proxy} />}
                            </DragMenu>
                          )
                        }),
                        navItem({
                          icon: <BarChartIcon />,
                          tooltip: 'Charts',
                          toggle: () => toggle({ chartMenuOpen: !chartMenuOpen }),
                          Component: (
                            <DragMenu
                              title={'Open chart menu'}
                              active={chartMenuOpen}
                              close={() => toggle({ chartMenuOpen: false })}
                            >
                              {(height, width) => 'hello world'}
                            </DragMenu>
                          )
                        })
                      ]}
                    </NavigationDial>

                    {/* App Configuration SpeedDial menu */}
                    <NavigationDial
                      direction={'left'}
                      icon={<SettingsIcon />}
                      configMenuOpen={false}
                      style={{ position: 'absolute', right: 20, top: 197 }}
                    >
                      {(toggleConfigMenu, { configMenuOpen }) => [
                        navItem({
                          icon: <BeachAccessIcon />,
                          tooltip: 'TODO',
                          toggle: () => toggleConfigMenu({ configMenuOpen: !configMenuOpen }),
                          title: 'Config TODO menu',
                          active: configMenuOpen,
                          Component: (
                            <DragMenu
                              title={'App configuration'}
                              active={configMenuOpen}
                              close={() => toggleConfigMenu({ configMenuOpen: false })}
                            >
                              {(height, width) => 'hello world'}
                            </DragMenu>
                          )
                        })
                      ]}
                    </NavigationDial>
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
