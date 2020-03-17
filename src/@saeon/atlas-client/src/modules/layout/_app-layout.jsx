import React from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Fab
} from '@material-ui/core'
import SaeonSearch from '../saeon-search'
import LayerManager from '../layer-manager'
import CsirLayers from '../csir-layers'
import {
  Search as SearchIcon,
  Layers as LayersIcon,
  List as ListIcon,
  Build as BuildIcon,
  Menu as MenuIcon,
  GitHub as GitHubIcon
} from '@material-ui/icons'
import { DragMenu, SideMenu, SpeedDial, Form } from '../../components'
import { MenuContext } from '../menu-provider'

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

            <IconButton
              onClick={() =>
                window.open(
                  'https://github.com/SAEONData/saeon-atlas/tree/master/src/%40saeon/atlas-client'
                )
              }
              style={{ marginLeft: 'auto' }}
              color="inherit"
              size="small"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Search SpeedDial menu */}
        <Form dialOpen={false}>
          {({ updateForm, dialOpen }) => (
            <SpeedDial
              style={{ position: 'absolute', right: 20, top: 57 }}
              direction={'left'}
              onOpen={() => updateForm({ dialOpen: true })}
              onClose={() => updateForm({ dialOpen: false })}
              open={dialOpen}
              icon={<SearchIcon />}
            >
              {[
                {
                  icon: <Avatar>S</Avatar>,
                  tooltip: 'Saerch SAEON data',
                  toggle: () =>
                    updateMenuManager({
                      saeonSearchMenu: { active: !fields.saeonSearchMenu.active }
                    }),
                  title: 'Search SAEON data',
                  active: fields.saeonSearchMenu.active,
                  Component: (
                    <DragMenu
                      onMouseDown={() => setActiveMenu('saeonSearchMenu')}
                      zIndex={fields.saeonSearchMenu.zIndex}
                      title={'Search SAEON data'}
                      active={fields.saeonSearchMenu.active}
                      close={() => updateMenuManager({ saeonSearchMenu: { active: false } })}
                    >
                      <SaeonSearch proxy={proxy} />
                    </DragMenu>
                  )
                },
                {
                  icon: <Avatar>C</Avatar>,
                  tooltip: 'Saerch CSIR data',
                  toggle: () =>
                    updateMenuManager({
                      csirSearchMenu: { active: !fields.csirSearchMenu.active }
                    }),
                  title: 'Search CSIR data',
                  active: fields.csirSearchMenu.active,
                  Component: (
                    <SideMenu
                      title={'Search CSIR data'}
                      location="top"
                      width={420}
                      height={'calc(100% - 75px)'}
                      active={fields.csirSearchMenu.active}
                      toggle={() =>
                        updateMenuManager({
                          csirSearchMenu: { active: !fields.csirSearchMenu.active }
                        })
                      }
                    >
                      <CsirLayers proxy={proxy} />
                    </SideMenu>
                  )
                }
              ]}
            </SpeedDial>
          )}
        </Form>

        {/* Layers SpeedDial menu */}
        <Form dialOpen={false}>
          {({ updateForm, dialOpen }) => (
            <SpeedDial
              style={{ position: 'absolute', right: 20, top: 127 }}
              direction={'left'}
              onOpen={() => updateForm({ dialOpen: true })}
              onClose={() => updateForm({ dialOpen: false })}
              open={dialOpen}
              icon={<LayersIcon />}
            >
              {[
                {
                  icon: <ListIcon />,
                  tooltip: 'Layers menu',
                  toggle: () =>
                    updateMenuManager({ layersMenu: { active: !fields.layersMenu.active } }),
                  Component: (
                    <DragMenu
                      onMouseDown={() => setActiveMenu('layersMenu')}
                      zIndex={fields.layersMenu.zIndex}
                      title={'Open layers menu'}
                      active={fields.layersMenu.active}
                      close={() => updateMenuManager({ layersMenu: { active: false } })}
                    >
                      <LayerManager layersActive={fields.layersMenu.active} proxy={proxy} />
                    </DragMenu>
                  )
                }
              ]}
            </SpeedDial>
          )}
        </Form>

        {/* Config menu */}
        <>
          <Fab
            size="small"
            color="primary"
            style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 1 }}
            aria-label="toggle menu"
            onClick={() => updateMenuManager({ configMenu: { active: !fields.configMenu.active } })}
          >
            <BuildIcon />
          </Fab>
          <DragMenu
            onMouseDown={() => setActiveMenu('configMenu')}
            zIndex={fields.configMenu.zIndex}
            title={'Open layers menu'}
            active={fields.configMenu.active}
            close={() => updateMenuManager({ configMenu: { active: false } })}
          >
            hi
          </DragMenu>
        </>
      </>
    )}
  </MenuContext.Consumer>
)
