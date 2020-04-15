import React from 'react'
import LayerManager from './modules/layer-manager'
import { Layers as LayersIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { MenuContext } from '../provider-menu'
import { Fab } from '@material-ui/core'

export default () => {
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, setActiveMenu, getMenuById, getActiveMenuZIndex }) => {
        return (
          <Fab
            size="large"
            color="primary"
            style={{ position: 'absolute', right: 20, top: 127, zIndex: 1 }}
            aria-label="toggle menu"
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
          >
            <LayersIcon />
          </Fab>
        )
      }}
    </MenuContext.Consumer>
  )
}
