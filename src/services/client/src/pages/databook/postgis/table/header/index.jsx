import clsx from 'clsx'
import { Toolbar } from '@material-ui/core'
import useStyles from './style'
import AddDashboardItem from './_add-dashboard-item'

export default () => {
  const classes = useStyles()

  return (
    <Toolbar variant="dense" className={clsx(classes.toolbar)}>
      <AddDashboardItem />
    </Toolbar>
  )
}
