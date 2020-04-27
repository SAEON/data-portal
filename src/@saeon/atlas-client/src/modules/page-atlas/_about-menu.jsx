import React from 'react'
import { Fab } from '@material-ui/core'
import { Info as InfoIcon } from '@material-ui/icons'
import { DragMenu } from '../../components'
import { MenuContext } from '@saeon/snap-menus'
import AboutContent from './modules/about'
import packageJson from '../../../package.json'
import useStyles from './style'

export default () => {
  const classes = useStyles()
  return (
    <MenuContext.Consumer>
      {({ addMenu, removeMenu, setActiveMenu, getMenuById, getActiveMenuZIndex }) => {
        return (
          <>
            <div style={{ clear: 'both' }} />
            <Fab
              size="large"
              color="primary"
              style={{ float: 'right', marginTop: 12, marginRight: 12 }}
              className={classes.menuIcon}
              aria-label="toggle config menu"
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
                        {() => <AboutContent />}
                      </DragMenu>
                    ),
                  })
                }
              }}
            >
              <InfoIcon />
            </Fab>
          </>
        )
      }}
    </MenuContext.Consumer>
  )
}
