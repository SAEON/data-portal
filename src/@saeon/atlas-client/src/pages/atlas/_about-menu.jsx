import React from 'react'
import { Fab } from '@material-ui/core'
import { Info as InfoIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { MenuContext } from '../../modules/menu-provider'
import packageJson from '../../../package.json'

export default () => (
  <MenuContext.Consumer>
    {({ addMenu, removeMenu, setActiveMenu, getMenuById, getActiveMenuZIndex }) => {
      return (
        <Fab
          size="small"
          color="primary"
          style={{ position: 'absolute', right: 20, bottom: 20, zIndex: 1 }}
          aria-label="toggle-config-menu"
          onClick={() => {
            const id = 'configMenu'
            if (getMenuById(id)) {
              removeMenu(id)
            } else {
              addMenu({
                id,
                zIndex: getActiveMenuZIndex() || 1,
                Component: () => (
                  <DragMenu
                    onMouseDown={() => setActiveMenu(id)}
                    zIndex={getMenuById(id).zIndex}
                    title={`About ${packageJson.name}`}
                    close={() => removeMenu(id)}
                  >
                    {() => 'hi'}
                  </DragMenu>
                ),
              })
            }
          }}
        >
          <InfoIcon />
        </Fab>
      )
    }}
  </MenuContext.Consumer>
)
