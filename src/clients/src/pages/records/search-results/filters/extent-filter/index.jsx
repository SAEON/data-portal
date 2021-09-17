import { useState, useContext, lazy, Suspense } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import Card from '@material-ui/core/Card'
import useTheme from '@material-ui/core/styles/useTheme'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { context as globalContext } from '../../../../../contexts/global'
import Loading from '../../../../../components/loading'

const Map = lazy(() => import('./map'))

export default ({ title }) => {
  const { global } = useContext(globalContext)
  const [collapsed, setCollapsed] = useState(!global?.extent)
  const theme = useTheme()

  return (
    <>
      <AppBar
        position="relative"
        variant="outlined"
        color="inherit"
        style={{
          borderRadius: `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
          zIndex: 1,
        }}
      >
        <Toolbar variant="regular">
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
      <Collapse style={{ width: '100%' }} key="result-list-collapse" unmountOnExit in={!collapsed}>
        <Suspense
          fallback={
            <div style={{ height: theme.overrides.MuiLinearProgress.root.height }}>
              <Loading />
            </div>
          }
        >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Card>
                <div style={{ position: 'relative' }}>
                  <Map />
                </div>
              </Card>
            </Grid>
          </Grid>
        </Suspense>
      </Collapse>
    </>
  )
}
