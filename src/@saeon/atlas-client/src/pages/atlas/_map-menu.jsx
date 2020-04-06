import React from 'react'
import LayerManager from '../../modules/layer-manager'
import { Layers as LayersIcon, List as ListIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import DialMenu from './_dial-menu'
import { MenuContext } from '../../modules/menu-provider'
import { SpeedDialAction } from '@material-ui/lab'

export default () => {
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, setActiveMenu, getMenuById }) => {
        return (
          <DialMenu
            style={{ position: 'absolute', right: 20, top: 127 }}
            direction={'left'}
            icon={<LayersIcon />}
          >
            <SpeedDialAction
              icon={<ListIcon />}
              tooltipTitle={'Layers menu'}
              onClick={() => {
                const id = 'layersMenu'
                if (getMenuById(id)) {
                  removeMenu(id)
                } else {
                  addMenu({
                    id,
                    Component: () => {
                      return (
                        <DragMenu
                          onMouseDown={() => setActiveMenu('layersMenu')}
                          zIndex={getMenuById('layersMenu').zIndex}
                          title={'Open layers menu'}
                          active={Boolean(getMenuById('layersMenu'))}
                          close={() => removeMenu(id)}
                        >
                          {() => <LayerManager layersActive={Boolean(getMenuById('layersMenu'))} />}
                        </DragMenu>
                      )
                    },
                  })
                }
              }}
            />
          </DialMenu>
        )
      }}
    </MenuContext.Consumer>
  )
}
