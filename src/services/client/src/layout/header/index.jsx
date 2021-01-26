import { useContext } from 'react'
import { AppBar, Toolbar, Typography, Link, Grid } from '@material-ui/core'
import { useLocation } from 'react-router-dom'
import packageJson from '../../../package.json'
import { CATALOGUE_DEPLOYMENT_ENV } from '../../config'
import Authentication from './auth'
import ShareOrEmbed from '../../components/share-or-embed'
import useStyles from './style'
import clsx from 'clsx'
import { context as globalContext } from '../../contexts/global'
import NavMenu from './nav'
import { useTheme } from '@material-ui/core/styles'

export default () => {
  const classes = useStyles()
  useLocation() // Trigger re-render on location changes
  const { global } = useContext(globalContext)
  const { selectedIds } = global
  const theme = useTheme()

  return (
    <>
      <AppBar className={clsx(classes.appBar)} variant="outlined" position="fixed">
        <Toolbar disableGutters={true} variant="dense">
          <Grid container>
            <Grid item xs={12} sm={4}>
              <NavMenu />
            </Grid>

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
              {window.location.pathname.includes('atlas') && (
                <ShareOrEmbed
                  search={
                    selectedIds.length && window.location.pathname.includes('atlas')
                      ? { ids: selectedIds }
                      : global
                  }
                />
              )}
              {!window.location.pathname.includes('login') && (
                <div style={{ marginRight: theme.spacing(1) }}>
                  <Authentication />
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <div className={classes.toolbar} />
    </>
  )
}
