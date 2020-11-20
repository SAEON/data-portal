import { Toolbar, IconButton, Tooltip } from '@material-ui/core'
import useStyles from './style'
import DashboardsIcon from 'mdi-react/ViewDashboardIcon'
import ChartsIcon from 'mdi-react/ChartBellCurveIcon'
import clsx from 'clsx'
import { useTheme } from '@material-ui/core/styles'

export default ({ active, setActive }) => {
  const theme = useTheme()

  const classes = useStyles()
  return (
    <Toolbar className={clsx(classes.toolbar)} variant="dense">
      <Tooltip title="Show dashboards">
        <IconButton onClick={() => setActive('dashboards')} size="small">
          <DashboardsIcon
            style={{
              color:
                active === 'dashboards' ? theme.palette.success.main : theme.palette.primary.light,
            }}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title="Show charts">
        <IconButton onClick={() => setActive('charts')} size="small">
          <ChartsIcon
            style={{
              color: active === 'charts' ? theme.palette.success.main : theme.palette.primary.light,
            }}
          />
        </IconButton>
      </Tooltip>
    </Toolbar>
  )
}
