import React, { useState } from 'react'
import { AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@material-ui/core'
import { OlReact, MapProxy } from '@saeon/ol-react'
import { terrestrisBaseMap, esriLayer } from '../../lib/ol'
import { NavigationDial, NavigationButton, navItem } from './_navigation'
import { SaeonSearch, LayerManager } from '..'
import {
  Search as SearchIcon,
  Layers as LayersIcon,
  List as ListIcon,
  BarChart as BarChartIcon,
  Menu as MenuIcon,
  Build as BuildIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import { DragMenu, SideMenu, Form } from '../../components'

const esriUrls = [
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_AveTemp_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_rain_v3/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/SA_flood_hazard_index/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/Drought_tendencies_base_v2/MapServer',
  'https://pta-gis-2-web1.csir.co.za/server2/rest/services/RCP45_B_vhd_v4/MapServer'
]

const getHighestZIndex = zIndices => Math.max(...Object.entries(zIndices).map(([, val]) => val))

export default () => {
  const [menuAnchor, setMenuAnchor] = useState(null)
  return (
    <>
      <AppBar variant="outlined" position="static">
        <Toolbar disableGutters={false} variant="dense">
          <IconButton
            onClick={e => setMenuAnchor(e.currentTarget)}
            style={{ padding: 0 }}
            edge="start"
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={menuAnchor}
            keepMounted
            open={Boolean(menuAnchor)}
            onClose={() => setMenuAnchor(null)}
          >
            <MenuItem onClick={() => alert('hi')}>Not</MenuItem>
            <MenuItem onClick={() => alert('hi')}>sure</MenuItem>
            <MenuItem onClick={() => alert('hi')}>if</MenuItem>
            <MenuItem onClick={() => alert('hi')}>this</MenuItem>
            <MenuItem onClick={() => alert('hi')}>is</MenuItem>
            <MenuItem onClick={() => alert('hi')}>needed</MenuItem>
          </Menu>
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
                <Form
                  configZIndex={1}
                  editMenuZIndex={1}
                  chartsZIndex={1}
                  layersZIndex={1}
                  saeonSearchZindex={1}
                >
                  {({ updateForm, ...zIndices }) => (
                    <>
                      {/* Search SpeedDial menu */}
                      <NavigationDial
                        direction={'left'}
                        icon={<SearchIcon />}
                        searchSaeonOpen={false}
                        searchCSIROpen={false}
                        style={{ position: 'absolute', right: 20, top: 57 }}
                      >
                        {(toggle, { searchSaeonOpen, searchCSIROpen }) => [
                          navItem({
                            icon: <Avatar>S</Avatar>,
                            tooltip: 'Saerch SAEON data',
                            toggle: () => toggle({ searchSaeonOpen: !searchSaeonOpen }),
                            title: 'Search SAEON data',
                            active: searchSaeonOpen,
                            Component: (
                              <DragMenu
                                onMouseDown={() =>
                                  updateForm({
                                    saeonSearchZindex: getHighestZIndex(zIndices) + 1
                                  })
                                }
                                zIndex={zIndices.saeonSearchZindex}
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
                            tooltip: 'Saerch CSIR data',
                            toggle: () => toggle({ searchCSIROpen: !searchCSIROpen }),
                            title: 'Search CSIR data',
                            active: searchCSIROpen,
                            Component: (
                              <SideMenu
                                title={'Search CSIR data'}
                                location="top"
                                width={420}
                                active={searchCSIROpen}
                                toggle={() => toggle({ searchCSIROpen: !searchCSIROpen })}
                              >
                                hello world
                              </SideMenu>
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
                                onMouseDown={() =>
                                  updateForm({
                                    layersZIndex: getHighestZIndex(zIndices) + 1
                                  })
                                }
                                zIndex={zIndices.layersZIndex}
                                title={'Open layers menu'}
                                active={layerMenuOpen}
                                close={() => toggle({ layerMenuOpen: false })}
                              >
                                {(height, width) => (<LayerManager layersActive={layerMenuOpen} proxy={proxy} />)}
                              </DragMenu>
                            )
                          }),
                          navItem({
                            icon: <BarChartIcon />,
                            tooltip: 'Charts',
                            toggle: () => toggle({ chartMenuOpen: !chartMenuOpen }),
                            Component: (
                              <DragMenu
                                onMouseDown={() =>
                                  updateForm({
                                    chartsZIndex: getHighestZIndex(zIndices) + 1
                                  })
                                }
                                zIndex={zIndices.chartsZIndex}
                                title={'Open chart menu'}
                                active={chartMenuOpen}
                                close={() => toggle({ chartMenuOpen: false })}
                              >
                                {(height, width) => ('TODO')}
                              </DragMenu>
                            )
                          })
                        ]}
                      </NavigationDial>

                      {/* Edit menu */}
                      <NavigationButton
                        open={false}
                        style={{ position: 'absolute', right: 80, bottom: 20, zIndex: 1 }}
                        icon={<EditIcon fontSize="inherit" />}
                      >
                        {(toggle, { open }) => [
                          navItem({
                            active: open,
                            toggle: () => toggle({ open: !open }),
                            Component: (
                              <DragMenu
                                onMouseDown={() =>
                                  updateForm({
                                    editMenuZIndex: getHighestZIndex(zIndices) + 1
                                  })
                                }
                                zIndex={zIndices.editMenuZIndex}
                                title={'Open layers menu'}
                                active={open}
                                close={() => toggle({ open: false })}
                              >
                                {(height, width) => ('hi')}
                              </DragMenu>
                            )
                          })
                        ]}
                      </NavigationButton>

                      {/* Config menu */}
                      <NavigationButton
                        open={false}
                        style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 1 }}
                        icon={<BuildIcon fontSize="inherit" />}
                      >
                        {(toggle, { open }) => [
                          navItem({
                            active: open,
                            toggle: () => toggle({ open: !open }),
                            Component: (
                              <DragMenu
                                onMouseDown={() =>
                                  updateForm({
                                    configZIndex: getHighestZIndex(zIndices) + 1
                                  })
                                }
                                zIndex={zIndices.configZIndex}
                                title={'Open layers menu'}
                                active={open}
                                close={() => toggle({ open: false })}
                              >
                                {(height, width) => ('hi')}
                              </DragMenu>
                            )
                          })
                        ]}
                      </NavigationButton>
                    </>
                  )}
                </Form>
              )}
            </MapProxy>
          )}
        </OlReact>
      </div>
    </>
  )
}
