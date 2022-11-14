import { useState, useContext, lazy, Suspense, useCallback, useMemo } from 'react'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import Paper from '@mui/material/Paper'
import { ChevronDown as ChevronDownIcon } from '../../../../../components/icons'
import { ChevronUp as ChevronUpIcon } from '../../../../../components/icons'
import { context as globalContext } from '../../../../../contexts/global'
import Loading from '../../../../../components/loading'
import { Div } from '../../../../../components/html-tags'

const Map = lazy(() => import('./map'))

export default ({ title }) => {
  const {
    global: { extent },
  } = useContext(globalContext)
  const [overrideCollapse, setOverrideCollapse] = useState(true)

  const toggle = useCallback(
    () => setOverrideCollapse(c => (c === false || c === 'out' ? 'in' : 'out')),
    []
  )

  const collapsed = useMemo(
    () =>
      overrideCollapse === 'in'
        ? false
        : overrideCollapse === 'out'
        ? true
        : overrideCollapse === true
        ? false
        : !extent,
    [extent, overrideCollapse]
  )

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
        <Toolbar variant="dense">
          <Typography onClick={toggle} sx={{ cursor: 'pointer' }} variant="overline" noWrap>
            {title}
          </Typography>

          <Div sx={{ marginLeft: 'auto' }}>
            {/* Icon */}
            <IconButton aria-label="Collapse filter" onClick={toggle} color="inherit" size="small">
              {collapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
            </IconButton>
          </Div>
        </Toolbar>
      </AppBar>
      <Collapse
        timeout="auto"
        sx={{ width: '100%' }}
        key="result-list-collapse"
        unmountOnExit
        in={overrideCollapse === 'in' ? true : overrideCollapse === 'out' ? false : !collapsed}
      >
        <Suspense
          fallback={
            <Div>
              <Loading />
            </Div>
          }
        >
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Paper>
                <Div sx={{ position: 'relative' }}>
                  <Map />
                </Div>
              </Paper>
            </Grid>
          </Grid>
        </Suspense>
      </Collapse>
    </>
  )
}