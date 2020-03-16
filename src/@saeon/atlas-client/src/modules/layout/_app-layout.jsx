import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Avatar } from '@material-ui/core'
import { NavigationDial, NavigationButton, navItem } from './_navigation'
import SaeonSearch from '../saeon-search'
import LayerManager from '../layer-manager'
import CsirLayers from '../csir-layers'
import {
  Search as SearchIcon,
  Layers as LayersIcon,
  List as ListIcon,
  BarChart as BarChartIcon,
  Build as BuildIcon,
  Edit as EditIcon,
  Menu as MenuIcon
} from '@material-ui/icons'
import { DragMenu, SideMenu } from '../../components'
import { MenuContext } from './_menu-manager'

export default ({ proxy }) => (
  <MenuContext.Consumer>
    {({ updateMenuManager, setActiveMenu, ...fields }) => (
      <>
        {/* Top menu bar */}
        <AppBar variant="outlined" position="static">
          <Toolbar disableGutters={false} className="thin-toolbar">
            <IconButton
              onClick={e => updateMenuManager({ topMenu: { menuAnchor: e.currentTarget } })}
              style={{ padding: 0 }}
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={fields.topMenu.menuAnchor}
              keepMounted
              open={Boolean(fields.topMenu.menuAnchor)}
              onClose={() => updateMenuManager({ topMenu: { menuAnchor: null } })}
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
                  onMouseDown={() => setActiveMenu('saeonSearchMenu')}
                  zIndex={fields.saeonSearchMenu.zIndex}
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
                  height={'calc(100% - 75px)'}
                  active={searchCSIROpen}
                  toggle={() => toggle({ searchCSIROpen: !searchCSIROpen })}
                >
                  <CsirLayers proxy={proxy} />
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
                  onMouseDown={() => setActiveMenu('layersMenu')}
                  zIndex={fields.layersMenu.zIndex}
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
                  onMouseDown={() => setActiveMenu('chartsMenu')}
                  zIndex={fields.chartsMenu.zIndex}
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
          style={{ position: 'absolute', right: 75, bottom: 20, zIndex: 1 }}
          icon={<EditIcon />}
        >
          {(toggle, { open }) => [
            navItem({
              active: open,
              toggle: () => toggle({ open: !open }),
              Component: (
                <DragMenu
                  onMouseDown={() => setActiveMenu('editMenu')}
                  zIndex={fields.editMenu.zIndex}
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
          icon={<BuildIcon />}
        >
          {(toggle, { open }) => [
            navItem({
              active: open,
              toggle: () => toggle({ open: !open }),
              Component: (
                <DragMenu
                  onMouseDown={() => setActiveMenu('configMenu')}
                  zIndex={fields.configMenu.zIndex}
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
  </MenuContext.Consumer>
)
