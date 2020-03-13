import React from 'react'
import { Avatar } from '@material-ui/core'
import { NavigationDial, NavigationButton, navItem } from './_navigation'
import { SaeonSearch, LayerManager, CsirLayers } from '..'
import {
  Search as SearchIcon,
  Layers as LayersIcon,
  List as ListIcon,
  BarChart as BarChartIcon,
  Build as BuildIcon,
  Edit as EditIcon
} from '@material-ui/icons'
import { DragMenu, SideMenu, Form } from '../../components'

const getHighestZIndex = zIndices => Math.max(...Object.entries(zIndices).map(([, val]) => val))

export default ({ proxy }) => (
  <Form configZIndex={1} editMenuZIndex={1} chartsZIndex={1} layersZIndex={1} saeonSearchZindex={1}>
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
                  <SaeonSearch proxy={proxy} />
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
                  <CsirLayers />
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
                  <LayerManager layersActive={layerMenuOpen} proxy={proxy} />
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
                  TODO
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
                  hi
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
                  hi
                </DragMenu>
              )
            })
          ]}
        </NavigationButton>
      </>
    )}
  </Form>
)
