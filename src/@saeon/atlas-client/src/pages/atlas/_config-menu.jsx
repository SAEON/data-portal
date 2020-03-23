import React from 'react'
import { Fab } from '@material-ui/core'
import { Build as BuildIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { MenuContext } from '../../modules/menu-provider'

export default () => (
  <MenuContext.Consumer>
    {({ updateMenuManager, setActiveMenu, getMenuById }) => {
      const configMenu = getMenuById('configMenu')
      return (
        <>
          <Fab
            size="small"
            color="primary"
            style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 1 }}
            aria-label="toggle menu"
            onClick={() => updateMenuManager({ configMenu: { active: !configMenu.active } })}
          >
            <BuildIcon />
          </Fab>
          <DragMenu
            onMouseDown={() => setActiveMenu('configMenu')}
            zIndex={configMenu.zIndex}
            title={'Open layers menu'}
            active={configMenu.active}
            close={() => updateMenuManager({ configMenu: { active: false } })}
          >
            {() => 'hi'}
          </DragMenu>
        </>
      )
    }}
  </MenuContext.Consumer>
)
