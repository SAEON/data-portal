import AddChart from './add-chart'
import Share from './_share'
import DeleteDashboard from './_delete'
import AddFilter from './add-filter'
import Preview from './_preview'
import Save from './save'
import Edit from './edit'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useStyles from '../style'
import clsx from 'clsx'
import { useTheme } from '@mui/material/styles'

export default ({ dashboard, activeTabIndex, setActiveTabIndex, gridState }) => {
  const theme = useTheme()
  const { id: dashboardId, title } = dashboard
  const classes = useStyles()

  return (
    <Toolbar disableGutters className={clsx(classes.toolbar)} variant={'dense'}>
      <div style={{ display: 'flex', width: '100%' }}>
        <Typography
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            paddingLeft: theme.spacing(1),
          }}
          variant="overline"
        >
          {title || dashboardId}
        </Typography>
      </div>

      <div style={{ marginLeft: 'auto', display: 'flex' }}>
        <Save {...dashboard} gridState={gridState} />
        <span style={{ marginRight: theme.spacing(1) }} />
        <Edit {...dashboard} />
        <span style={{ marginRight: theme.spacing(1) }} />
        <AddChart {...dashboard} />
        <span style={{ marginRight: theme.spacing(1) }} />
        <AddFilter {...dashboard} />
        <span style={{ marginRight: theme.spacing(1) }} />
        <Share {...dashboard} />
        <span style={{ marginRight: theme.spacing(1) }} />
        <Preview {...dashboard} />
        <span style={{ marginRight: theme.spacing(1) }} />
        <DeleteDashboard
          {...dashboard}
          activeTabIndex={activeTabIndex}
          setActiveTabIndex={setActiveTabIndex}
        />
        <span style={{ marginRight: theme.spacing(1) }} />
      </div>
    </Toolbar>
  )
}
