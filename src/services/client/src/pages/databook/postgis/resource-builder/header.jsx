import { forwardRef } from 'react'
import { Toolbar, IconButton, Tooltip } from '@material-ui/core'
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
      {/* Allow children of sibling to populate the toolbar appropriately */}
      <div ref={ref} />

      {/* Other buttons */}
      <Tooltip title="Show dashboards">
        <IconButton
          style={{ marginLeft: 'auto' }}
          onClick={() => setActive('dashboards')}
          size="small"
        >
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
})
