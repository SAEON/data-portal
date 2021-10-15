import { forwardRef } from 'react'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import useStyles from '../../../style'
import DashboardsIcon from 'mdi-react/ViewDashboardIcon'
import ChartsIcon from 'mdi-react/ChartBoxOutlineIcon'
import FilterIcon from 'mdi-react/FilterVariantIcon'
import clsx from 'clsx'
import { useTheme } from '@mui/material/styles'

export default forwardRef(({ active, setActive }, ref) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <Toolbar disableGutters className={clsx(classes.toolbar)} variant="dense">
      <div style={{ display: 'flex', width: '100%' }}>
        <div ref={ref} style={{ overflow: 'hidden' }} />
        <div
          style={{
            marginLeft: 'auto',
            marginRight: theme.spacing(1),
            height: 48,
            lineHeight: `48px`,
            alignSelf: 'center',
            textAlign: 'center',
          }}
        >
          <Tooltip placement="left-start" title="Show dashboards">
            <IconButton
              style={{ marginRight: theme.spacing(0.5) }}
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
          <Tooltip placement="left-start" title="Show charts">
            <IconButton
              style={{ marginLeft: theme.spacing(0.5) }}
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
          <Tooltip placement="left-start" title="Show Filters">
            <IconButton
              style={{ marginLeft: theme.spacing(0.5) }}
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
        </div>
      </div>
    </Toolbar>
  )
})
