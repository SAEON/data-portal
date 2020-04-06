import React from 'react'
import { Fab } from '@material-ui/core'
import { Build as BuildIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { MenuContext } from '../../modules/menu-provider'

export default () => (
  <MenuContext.Consumer>
    {({ addMenu, removeMenu, setActiveMenu, getMenuById }) => {
      return (
        <Fab
          size="small"
          color="primary"
          style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 1 }}
          aria-label="toggle menu"
          onClick={() => {
            const id = 'configMenu'
            if (getMenuById(id)) {
              removeMenu(id)
            } else {
              addMenu({
                id,
                Component: () => (
                  <DragMenu
                    onMouseDown={() => setActiveMenu('configMenu')}
                    zIndex={getMenuById(id).zIndex}
                    title={'Open layers menu'}
                    active={Boolean(getMenuById(id))}
                    close={() => removeMenu(id)}
                  >
                    {() => 'hi'}
                  </DragMenu>
                ),
              })
            }
          }}
        >
          <BuildIcon />
        </Fab>
      )
    }}
  </MenuContext.Consumer>
)
