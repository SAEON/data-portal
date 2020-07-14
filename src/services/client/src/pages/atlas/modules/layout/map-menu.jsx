import React from 'react'
import LayerManager from '../layer-manager'
import { Layers as LayersIcon } from '@material-ui/icons'
import { useMenu } from '@saeon/snap-menus'
import { Fab } from '@material-ui/core'
import useStyles from '../../style'
import { isMobile } from 'react-device-detect'
import QuickForm from '@saeon/quick-form'

export default () => {
  const classes = useStyles()
  const SnapMenu = useMenu({ id: 'map-menu' })

  return (
    <QuickForm open={false}>
      {({ updateForm, open }) => {
        const toggleMenu = () => updateForm({ open: !open })

        return (
          <>
            {/* Menu */}
            <SnapMenu
              title={'Open layers menu'}
              defaultSnap={isMobile ? 'Top' : null}
              open={open}
              onClose={toggleMenu}
            >
              {() => <LayerManager />}
            </SnapMenu>

            <Fab
              size="large"
              color="primary"
              className={classes.menuIcon}
              style={{ float: 'right', marginTop: 6, marginRight: 12 }}
              aria-label="toggle map menu"
              onClick={toggleMenu}
            >
              <LayersIcon />
            </Fab>
          </>
        )
      }}
    </QuickForm>
  )
}
