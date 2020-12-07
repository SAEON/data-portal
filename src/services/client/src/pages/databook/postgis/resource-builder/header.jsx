import { forwardRef } from 'react'
import { Toolbar, IconButton, Tooltip, Grid, Divider } from '@material-ui/core'
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
      <Grid container justify="flex-start" style={{ overflow: 'hidden' }}>
        <Grid
          item
          style={{
            padding: '0 24px',
            backgroundColor: theme.palette.grey[300],
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
        </Grid>

        {/* Allow children of sibling to populate the toolbar appropriately */}
        <Grid item innerRef={ref} style={{ flexGrow: 1 }} />
      </Grid>
    </Toolbar>
  )
})
