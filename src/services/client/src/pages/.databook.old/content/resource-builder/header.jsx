import { forwardRef } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Grid from '@material-ui/core/Grid'
import useStyles from '../../style'
import DashboardsIcon from 'mdi-react/ViewDashboardIcon'
import ChartsIcon from 'mdi-react/ChartBoxOutlineIcon'
import FilterIcon from 'mdi-react/FilterOutlineIcon'
import clsx from 'clsx'
import useTheme from '@material-ui/core/styles/useTheme'

export default forwardRef(({ active, setActive }, ref) => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <Toolbar disableGutters className={clsx(classes.toolbar)} variant="dense">
      <Grid container justify="flex-start" style={{ overflow: 'hidden' }}>
        {/* Allow children of sibling to populate the toolbar appropriately */}
        <Grid item innerRef={ref} style={{ flexGrow: 1 }} />

        {/* Toggle charts / dashboards / Filters */}
        <Grid
          item
          style={{
            padding: '0 24px',
            height: 48,
            lineHeight: `48px`,
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          <Tooltip title="Show dashboards">
            <IconButton
              style={{ marginRight: 10 }}
              onClick={() => setActive('dashboards')}
              size="small"
            >
              <DashboardsIcon
                style={{
                  color:
                    active === 'dashboards'
                      ? theme.palette.success.main
                      : theme.palette.primary.light,
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show charts">
            <IconButton style={{ marginLeft: 10 }} onClick={() => setActive('charts')} size="small">
              <ChartsIcon
                style={{
                  color:
                    active === 'charts' ? theme.palette.success.main : theme.palette.primary.light,
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Show Filters">
            <IconButton
              style={{ marginLeft: 10 }}
              onClick={() => setActive('filters')}
              size="small"
            >
              <FilterIcon
                style={{
                  color:
                    active === 'filters' ? theme.palette.success.main : theme.palette.primary.light,
                }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Toolbar>
  )
})
