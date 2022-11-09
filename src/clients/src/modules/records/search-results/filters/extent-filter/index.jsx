import { useState, useContext, lazy, Suspense } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Fade from '@mui/material/Fade'
import Card from '@mui/material/Card'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { context as globalContext } from '../../../../../contexts/global'
import Loading from '../../../../../components/loading'
import { Div, Span } from '../../../../../components/html-tags'

const Map = lazy(() => import('./map'))

export default ({ title }) => {
  const { global } = useContext(globalContext)
  const [collapsed, setCollapsed] = useState(!global?.extent)

  return (
    <>
      <AppBar
        position="relative"
        variant="outlined"
        elevation={0}
        color="inherit"
        sx={{
          borderRadius: theme => `${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0 0`,
          zIndex: 1,
        }}
      >
        <Toolbar variant="regular">
          <Typography
            onClick={() => setCollapsed(!collapsed)}
            sx={{ cursor: 'pointer' }}
            variant="overline"
            noWrap
          >
            {title}
          </Typography>

          <Div sx={{ marginLeft: 'auto' }}>
            {/* Icon */}
            <IconButton
              aria-label="Collapse filter"
              onClick={() => setCollapsed(!collapsed)}
              color="inherit"
              size="small"
            >
              {collapsed ? (
                <Fade key={1} timeout={750} in={collapsed}>
                  <Span>
                    <ExpandMoreIcon />
                  </Span>
                </Fade>
              ) : (
                <Fade key={2} timeout={750} in={!collapsed}>
                  <Span>
                    <ExpandLessIcon />
                  </Span>
                </Fade>
              )}
            </IconButton>
          </Div>
        </Toolbar>
      </AppBar>
      <Collapse sx={{ width: '100%' }} key="result-list-collapse" unmountOnExit in={!collapsed}>
        <Suspense
          fallback={
            <Div>
              <Loading />
            </Div>
          }
        >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Card>
                <Div sx={{ position: 'relative' }}>
                  <Map />
                </Div>
              </Card>
            </Grid>
          </Grid>
        </Suspense>
      </Collapse>
    </>
  )
}
