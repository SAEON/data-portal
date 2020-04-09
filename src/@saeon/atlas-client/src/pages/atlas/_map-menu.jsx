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
      {({ addMenu, removeMenu, setActiveMenu, getMenuById, getActiveMenuZIndex }) => {
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
                    zIndex: getActiveMenuZIndex(),
                    Component: () => {
                      return (
                        <DragMenu
                          onMouseDown={() => setActiveMenu(id)}
                          zIndex={getMenuById(id).zIndex}
                          title={'Open layers menu'}
                          close={() => removeMenu(id)}
                        >
                          {() => <LayerManager layersActive={Boolean(getMenuById(id))} />}
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
