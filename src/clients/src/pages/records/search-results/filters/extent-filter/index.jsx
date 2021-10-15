import { useState, useContext, lazy, Suspense } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import Card from '@mui/material/Card'
import { useTheme } from '@mui/material/styles'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
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
            <div>
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
