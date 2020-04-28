import React from 'react'
import LayerManager from './modules/layer-manager'
import { Layers as LayersIcon } from '@material-ui/icons'
import { MenuContext, DragMenu } from '@saeon/snap-menus'
import { Fab } from '@material-ui/core'
import useStyles from './style'

export default () => {
  const classes = useStyles()
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, setActiveMenu, getMenuById, getActiveMenuZIndex }) => {
        return (
          <Fab
            size="large"
            color="primary"
            className={classes.menuIcon}
            style={{ float: 'right', marginTop: 6, marginRight: 12 }}
            aria-label="toggle map menu"
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
