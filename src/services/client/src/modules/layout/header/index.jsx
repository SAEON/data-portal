import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  Divider,
} from '@material-ui/core'
import {
  Explore as MapIcon,
  Menu as MenuIcon,
  GitHub as GitHubIcon,
  Storage as StorageIcon,
  Info as InfoIcon,
  Home as HomeIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@material-ui/icons'
import NavItem from './nav-item'
import packageJson from '../../../../package.json'
import { SOURCE_CODE_URI } from '../../../config'
import FeedbackDialogue from './_feedback-dialogue'
import AccountMenu from './_account-menu'
import useStyles from './style'
import clsx from 'clsx'
import { isMobile } from 'react-device-detect'

const headlessPages = ['/render']

export default withRouter(({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const classes = useStyles()
  const { pathname } = window.location
  // eslint-disable-next-line no-useless-escape
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0]

  return (
    <>
      {headlessPages.includes(currentRoute) ? null : (
        <>
          <AppBar
            color="inherit"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: isMobile ? false : drawerOpen,
            })}
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            variant="outlined"
            position="fixed"
          >
            <Toolbar disableGutters={false} variant="dense">
              {/* Title */}
              <Typography style={{ padding: '10px' }} display="block" variant="body2">
                SAEON DATA PORTAL v{packageJson.version}
              </Typography>

              {/* TOP-RIGHT ICON CONTROLS */}
              <div style={{ marginLeft: 'auto' }}>
                <FeedbackDialogue />
                <AccountMenu />
              </div>
            </Toolbar>
          </AppBar>
          <SwipeableDrawer
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: drawerOpen,
                [classes.drawerClose]: !drawerOpen,
              }),
            }}
            variant={isMobile ? 'temporary' : 'permanent'}
            anchor={'left'}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
          >
            <Toolbar disableGutters variant="dense" style={{ justifyContent: 'flex-end' }}>
              <IconButton
                style={{ marginRight: 4 }}
                edge="start"
                onClick={() => setDrawerOpen(!drawerOpen)}
              >
                {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
              </IconButton>
            </Toolbar>
            <Divider />
            {/* Home page */}
            <NavItem title="Navigate to the home page" label={'Home'} icon={<HomeIcon />} to="/" />

            {/* Catalogue page */}
            <NavItem
              title="Explore SAEON's metadata catalogue"
              label={'records'}
              icon={<StorageIcon />}
              to="/records"
            />

            {/* Atlas page */}
            <NavItem
              title="Preview and explore datasets"
              label={'Atlas'}
              icon={<MapIcon />}
              to="/atlas"
            />

            {/* About page */}
            <NavItem
              title="Navigate to the about page"
              label={'About'}
              icon={<InfoIcon />}
              to="/about"
            />

            {/* Source code link */}
            <NavItem
              title="MIT-licensed source code"
              label={'Source Code'}
              icon={<GitHubIcon />}
              href={SOURCE_CODE_URI}
            />
          </SwipeableDrawer>
          <div className={classes.toolbar} />
        </>
      )}

      <main
        className={clsx({
          [classes.content]: !headlessPages.includes(currentRoute),
          [classes.contentShift]:
            isMobile || headlessPages.includes(currentRoute) ? false : drawerOpen,
        })}
      >
        {children}
      </main>
    </>
  )
})
