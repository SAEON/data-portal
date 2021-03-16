import AddChart from './add-chart'
import Share from './_share'
import DeleteDashboard from './_delete'
import AddFilter from './add-filter'
import Preview from './_preview'
import Save from './save'
import Edit from './edit'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useStyles from '../style'
import clsx from 'clsx'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ dashboard, activeTabIndex, setActiveTabIndex, gridState }) => {
  const theme = useTheme()
  const { id: dashboardId, title } = dashboard
  const classes = useStyles()

  return (
    <Toolbar className={clsx(classes.toolbar)} variant={'dense'}>
      <Typography>{title || dashboardId}</Typography>
      <span style={{ marginLeft: 'auto' }} />
      <Save {...dashboard} gridState={gridState} />
      <span style={{ marginRight: theme.spacing(2) }} />
      <Edit {...dashboard} />
      <span style={{ marginRight: theme.spacing(2) }} />
      <AddChart {...dashboard} />
      <span style={{ marginRight: theme.spacing(2) }} />
      <AddFilter {...dashboard} />
      <span style={{ marginRight: theme.spacing(2) }} />
      <Share {...dashboard} />
      <span style={{ marginRight: theme.spacing(2) }} />
      <Preview {...dashboard} />
      <span style={{ marginRight: theme.spacing(2) }} />
      <DeleteDashboard
        {...dashboard}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
      />
    </Toolbar>
  )
}
