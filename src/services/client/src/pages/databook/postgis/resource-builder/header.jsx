import { forwardRef } from 'react'
import { Toolbar, IconButton, Tooltip, Grid } from '@material-ui/core'
import useStyles from '../../style'
import DashboardsIcon from 'mdi-react/ViewDashboardIcon'
import ChartsIcon from 'mdi-react/ChartBellCurveIcon'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'

export default forwardRef(({ active, setActive }, ref) => {
  const theme = useTheme()
  const classes = useStyles()
  return (
    <Toolbar disableGutters className={clsx(classes.toolbar)} variant="dense">
      <Grid container justify="flex-end" style={{ overflow: 'hidden' }}>
        {/* Allow children of sibling to populate the toolbar appropriately */}
        <Grid item innerRef={ref} style={{ flexGrow: 1 }} />

        {/* Other buttons */}
        <Grid item style={{ alignSelf: 'center', textAlign: 'right', flexGrow: 1 }}>
          <Tooltip title="Show dashboards">
            <IconButton
              style={{ marginRight: 4 }}
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
            <IconButton
              style={{ marginRight: 12 }}
              onClick={() => setActive('charts')}
              size="small"
            >
              <ChartsIcon
                style={{
                  color:
                    active === 'charts' ? theme.palette.success.main : theme.palette.primary.light,
                }}
              />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Toolbar>
  )
})
