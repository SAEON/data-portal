import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  SwipeableDrawer,
  Divider,
  Fade,
} from '@material-ui/core'
import {
  Explore as MapIcon,
  GitHub as GitHubIcon,
  Storage as StorageIcon,
  Info as InfoIcon,
  Search as SearchIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@material-ui/icons'
import NavItem from './nav-item'
import packageJson from '../../../../package.json'
import { SOURCE_CODE_URI } from '../../../config'
import FeedbackDialogue from './_feedback-dialogue'
import ShareOrEmbedMenu from './_share-or-embed'
import AccountMenu from './_account-menu'
import useStyles from './style'
import clsx from 'clsx'

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
            color="primary"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: false,
            })}
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            variant="outlined"
            position="fixed"
          >
            <Toolbar style={{ display: 'flex' }} disableGutters={false} variant="dense">
              <IconButton
                onClick={() => setDrawerOpen(!drawerOpen)}
                edge="start"
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              {/* TITLE */}
              <Typography style={{ padding: '10px' }} display="block" variant="body2">
                SAEON DATA PORTAL v{packageJson.version}
              </Typography>

              {/* TOP-RIGHT ICON CONTROLS */}
              <ShareOrEmbedMenu style={{ marginLeft: 'auto', marginRight: 10 }} />
              <FeedbackDialogue style={{ marginRight: 10 }} />
              <AccountMenu />
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
            variant={'temporary'}
            anchor={'left'}
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
            onOpen={() => setDrawerOpen(true)}
          >
            <Toolbar disableGutters variant="dense" style={{ justifyContent: 'flex-end' }}>
              {drawerOpen ? (
                <Fade in={drawerOpen} key="drawer-open">
                  <IconButton
                    style={{ marginRight: 4 }}
                    edge="start"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                </Fade>
              ) : (
                <Fade in={!drawerOpen} key="drawer-closed">
                  <IconButton
                    style={{ marginRight: 4 }}
                    edge="start"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Fade>
              )}
            </Toolbar>
            <Divider />
            {/* Home page */}
            <NavItem
              title="Navigate to the home page"
              label={'Home'}
              Icon={props => <SearchIcon {...props} />}
              to="/"
            />

            {/* Catalogue page */}
            <NavItem
              title="Explore SAEON's metadata catalogue"
              label={'Records'}
              Icon={props => <StorageIcon {...props} />}
              to="/records"
            />

            {/* Atlas page */}
            <NavItem
              title="Preview and explore datasets"
              label={'Atlas'}
              Icon={props => <MapIcon {...props} />}
              to="/atlas"
            />

            {/* About page */}
            <NavItem
              title="Navigate to the about page"
              label={'About'}
              Icon={props => <InfoIcon {...props} />}
              to="/about"
            />

            {/* Source code link */}
            <NavItem
              title="MIT-licensed source code"
              label={'Source Code'}
              Icon={() => <GitHubIcon color="secondary" />}
              href={SOURCE_CODE_URI}
            />
          </SwipeableDrawer>
          <div className={classes.toolbar} />
        </>
      )}

      <main
        className={clsx({
          [classes.content]: !headlessPages.includes(currentRoute),
        })}
      >
        {children}
      </main>
    </>
  )
})
