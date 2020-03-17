import React from 'react'
import LayerManager from '../modules/layer-manager'
import { Layers as LayersIcon, List as ListIcon } from '@material-ui/icons'
import { DragMenu } from '../components'
import DialMenu from '../modules/dial-menu'
import { MenuContext } from '../modules/menu-provider'
import { MapContext } from '../modules/map-provider'

export default () => (
  <MapContext.Consumer>
    {({ proxy }) => (
      <MenuContext.Consumer>
        {({ updateMenuManager, setActiveMenu, getMenuById }) => {
          const layersMenu = getMenuById('layersMenu')
          return (
            <DialMenu
              style={{ position: 'absolute', right: 20, top: 127 }}
              direction={'left'}
              icon={<LayersIcon />}
            >
              {[
                {
                  icon: <ListIcon />,
                  tooltip: 'Layers menu',
                  toggle: () => updateMenuManager({ layersMenu: { active: !layersMenu.active } }),
                  Component: (
                    <DragMenu
                      onMouseDown={() => setActiveMenu('layersMenu')}
                      zIndex={layersMenu.zIndex}
                      title={'Open layers menu'}
                      active={layersMenu.active}
                      close={() => updateMenuManager({ layersMenu: { active: false } })}
                    >
                      <LayerManager layersActive={layersMenu.active} proxy={proxy} />
                    </DragMenu>
                  )
                }
              ]}
            </DialMenu>
          )
        }}
      </MenuContext.Consumer>
    )}
  </MapContext.Consumer>
)
