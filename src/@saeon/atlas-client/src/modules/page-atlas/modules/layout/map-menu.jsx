import React from 'react'
import LayerManager from '../layer-manager'
import { Layers as LayersIcon } from '@material-ui/icons'
import { MenuContext, DragMenu } from '@saeon/snap-menus'
import { Fab } from '@material-ui/core'
import useStyles from '../../style'
import { isMobile } from 'react-device-detect'

export default () => {
  const classes = useStyles()
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, getMenuById }) => {
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
                  Component: props => {
                    return (
                      <DragMenu
                        {...props}
                        title={'Open layers menu'}
                        defaultSnap={isMobile ? 'Top' : 'BottomRight'}
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
