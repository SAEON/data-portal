import React from 'react'
import { Fab } from '@material-ui/core'
import { Info as InfoIcon } from '@material-ui/icons'
import { useMenu } from '@saeon/snap-menus'
import AboutContent from '../about'
import packageJson from '../../../../../package.json'
import useStyles from '../../style'
import { isMobile } from 'react-device-detect'
import { Form } from '../../../../components'

export default () => {
  const SnapMenu = useMenu({ id: 'about-menu' })
  const classes = useStyles()

  return (
    <Form open={false}>
      {({ updateForm, open }) => {
        const toggleMenu = () => updateForm({ open: !open })

        return (
          <>
            <div style={{ clear: 'both' }} />

            {/* Menu */}
            <SnapMenu
              title={`About ${packageJson.name}`}
              defaultSnap={isMobile ? 'Top' : 'Top'}
              open={open}
              onClose={toggleMenu}
            >
              <AboutContent />
            </SnapMenu>

            {/* Toggle menu button */}
            <Fab
              size="large"
              color="primary"
              style={{ float: 'right', marginTop: 12, marginRight: 12 }}
              className={classes.menuIcon}
              aria-label="Toggle info menu"
              onClick={toggleMenu}
            >
              <InfoIcon />
            </Fab>
          </>
        )
      }}
    </Form>
  )
}
