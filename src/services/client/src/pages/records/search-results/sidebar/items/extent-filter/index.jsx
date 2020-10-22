import { useState, useContext, lazy, Suspense } from 'react'
import {
  Typography,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  Collapse,
  Fade,
  Card,
} from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { ExpandMore as ExpandMoreIcon, ExpandLess as ExpandLessIcon } from '@material-ui/icons'
import useStyles from '../style'
import clsx from 'clsx'
import { GlobalContext } from '../../../../../../contexts/global'
import { Loading } from '../../../../../../components'

const Map = lazy(() => import('./map'))

export default ({ title }) => {
  const { global } = useContext(GlobalContext)
  const [collapsed, setCollapsed] = useState(!global?.extent)
  const classes = useStyles()
  const theme = useTheme()

  return (
    <>
      <AppBar
        position="relative"
        variant="outlined"
        className={clsx(classes.appbar)}
        style={{ borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0` }}
      >
        <Toolbar className={clsx(classes.toolbar)} variant="regular">
          <Typography
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: 'pointer' }}
            variant="overline"
            noWrap
          >
            {title}
          </Typography>

          <div style={{ marginLeft: 'auto' }}>
            {/* Icon */}
            <IconButton
              aria-label="Collapse filter"
              onClick={() => setCollapsed(!collapsed)}
              color="inherit"
              size="small"
            >
              {collapsed ? (
                <Fade key={1} timeout={750} in={collapsed}>
                  <ExpandMoreIcon />
                </Fade>
              ) : (
                <Fade key={2} timeout={750} in={!collapsed}>
                  <ExpandLessIcon />
                </Fade>
              )}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Collapse style={{ width: '100%' }} key="result-list-collapse" in={!collapsed}>
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Card>
              <div style={{ position: 'relative' }}>
                <Suspense
                  fallback={
                    <div style={{ height: 4 }}>
                      <Loading />
                    </div>
                  }
                >
                  <Map />
                </Suspense>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Collapse>
    </>
  )
}
