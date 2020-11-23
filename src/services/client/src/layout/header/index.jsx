import { useContext } from 'react'
import { AppBar, Toolbar, Typography, Link, Grid } from '@material-ui/core'
// import { GitHub as GitHubIcon } from '@material-ui/icons'
import packageJson from '../../../package.json'
import { CATALOGUE_DEPLOYMENT_ENV } from '../../config'
// import {CATALOGUE_SOURCE_CODE_URI} from '../../config'
import FeedbackDialogue from './_feedback-dialogue'
import ShareOrEmbed from '../../components/share-or-embed'
import useStyles from './style'
import clsx from 'clsx'
import { GlobalContext } from '../../contexts/global'

export default () => {
  const classes = useStyles()
  const { global } = useContext(GlobalContext)
  const { selectedIds } = global

  return (
    <>
      <AppBar className={clsx(classes.appBar)} variant="outlined" position="fixed">
        <Toolbar disableGutters={true} variant="dense">
          <Grid container>
            <Grid item xs={12} sm={4}></Grid>

            {/* MIDDLE (or Left, Mobile) */}
            <Grid container justify="center" alignItems="center" item xs={6} sm={4}>
              <Typography
                component={Link}
                style={{ color: 'white', cursor: 'pointer', margin: '0 8px' }}
                href="/"
                display="block"
                variant="body2"
              >
                SAEON DATA PORTAL{' '}
                {CATALOGUE_DEPLOYMENT_ENV === 'production'
                  ? undefined
                  : `${CATALOGUE_DEPLOYMENT_ENV}.${packageJson.version}`}
              </Typography>
            </Grid>

            {/* TOP-RIGHT */}
            <Grid container justify="flex-end" alignItems="center" item xs>
              {/* <Tooltip placement="left" title="MIT-licensed source code">
                <IconButton
                  onClick={() => window.open(CATALOGUE_SOURCE_CODE_URI, 'catalogue-source-code')}
                  color="inherit"
                >
                  <GitHubIcon color="inherit" />
                </IconButton>
              </Tooltip> */}
              {window.location.pathname.includes('atlas') && (
                <ShareOrEmbed
                  state={
                    selectedIds.length && window.location.pathname.includes('atlas')
                      ? { ids: selectedIds }
                      : global
                  }
                />
              )}
              <FeedbackDialogue />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbar} />
    </>
  )
}
