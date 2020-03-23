import React from 'react'
import { Avatar } from '@material-ui/core'
import SaeonSearch from '../../modules/saeon-search'
import CsirLayers from '../../modules/csir-layers'
import { Search as SearchIcon } from '@material-ui/icons'
import { DragMenu, SideMenu } from '../../components'
import DialMenu from '../../modules/dial-menu'
import { MenuContext } from '../../modules/menu-provider'
import { MapContext } from '../../modules/map-provider'

export default () => (
  <MapContext.Consumer>
    {({ proxy }) => (
      <MenuContext.Consumer>
        {({ updateMenuManager, getMenuById, setActiveMenu }) => {
          const saeonSearchMenu = getMenuById('saeonSearchMenu')
          const csirSearchMenu = getMenuById('csirSearchMenu')
          return (
            <DialMenu
              style={{ position: 'absolute', right: 20, top: 57 }}
              direction={'left'}
              icon={<SearchIcon />}
            >
              {[
                {
                  icon: <Avatar>S</Avatar>,
                  tooltip: 'Saerch SAEON data',
                  toggle: () =>
                    updateMenuManager({
                      saeonSearchMenu: { active: !saeonSearchMenu.active },
                    }),
                  title: 'Search SAEON data',
                  active: saeonSearchMenu.active,
                  Component: (
                    <DragMenu
                      onMouseDown={() => setActiveMenu('saeonSearchMenu')}
                      zIndex={saeonSearchMenu.zIndex}
                      title={'Search SAEON data'}
                      active={saeonSearchMenu.active}
                      close={() => updateMenuManager({ saeonSearchMenu: { active: false } })}
                    >
                      <SaeonSearch proxy={proxy} />
                    </DragMenu>
                  ),
                },
                {
                  icon: <Avatar>C</Avatar>,
                  tooltip: 'Saerch CSIR data',
                  toggle: () =>
                    updateMenuManager({
                      csirSearchMenu: { active: !csirSearchMenu.active },
                    }),
                  title: 'Search CSIR data',
                  active: csirSearchMenu.active,
                  Component: (
                    <SideMenu
                      title={'Search CSIR data'}
                      location="top"
                      width={420}
                      height={'calc(100% - 75px)'}
                      active={csirSearchMenu.active}
                      toggle={() =>
                        updateMenuManager({
                          csirSearchMenu: { active: !csirSearchMenu.active },
                        })
                      }
                    >
                      <CsirLayers proxy={proxy} />
                    </SideMenu>
                  ),
                },
              ]}
            </DialMenu>
          )
        }}
      </MenuContext.Consumer>
    )}
  </MapContext.Consumer>
)
