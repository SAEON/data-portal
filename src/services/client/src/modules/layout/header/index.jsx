import React from 'react'
import { withRouter } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, Typography, Tooltip, Link, Grid } from '@material-ui/core'
import { GitHub as GitHubIcon } from '@material-ui/icons'
import packageJson from '../../../../package.json'
import { SOURCE_CODE_URI, DEPLOYMENT_ENV, HEADLESS_PAGES } from '../../../config'
import FeedbackDialogue from './_feedback-dialogue'
import ShareOrEmbedMenu from './share-or-embed'
import useStyles from './style'
import clsx from 'clsx'

export default withRouter(({ children }) => {
  const classes = useStyles()
  const { pathname } = window.location
  // eslint-disable-next-line no-useless-escape
  const currentRoute = pathname.match(/[^\/]*\/[^\/]*/)[0]

  return (
    <>
      {HEADLESS_PAGES.includes(currentRoute) ? null : (
        <>
          <AppBar
            className={clsx(classes.appBar)}
            style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
            variant="outlined"
            position="fixed"
          >
            <Toolbar disableGutters={true} variant="dense">
              <Grid container>
                <Grid item xs={4}></Grid>

                {/* MIDDLE */}
                <Grid container justify="center" alignItems="center" item xs={4}>
                  <Typography
                    component={Link}
                    style={{ color: 'white', cursor: 'pointer' }}
                    href="/"
                    display="block"
                    variant="body2"
                  >
                    SAEON DATA PORTAL{' '}
                    {DEPLOYMENT_ENV === 'production'
                      ? undefined
                      : `${DEPLOYMENT_ENV}.${packageJson.version}`}
                  </Typography>
                </Grid>

                {/* TOP-RIGHT */}
                <Grid container justify="flex-end" alignItems="center" item xs={4}>
                  <Tooltip placement="left" title="MIT-licensed source code">
                    <IconButton onClick={() => window.open(SOURCE_CODE_URI)} color="inherit">
                      <GitHubIcon color="inherit" />
                    </IconButton>
                  </Tooltip>
                  <ShareOrEmbedMenu />
                  <FeedbackDialogue />
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>

          <div className={classes.toolbar} />
        </>
      )}

      {/* Main content */}
      <main
        className={clsx({
          [classes.content]: !HEADLESS_PAGES.includes(currentRoute),
        })}
      >
        {children}
      </main>
    </>
  )
})
