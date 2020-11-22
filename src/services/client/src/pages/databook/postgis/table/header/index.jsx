import clsx from 'clsx'
import { Toolbar } from '@material-ui/core'
import useStyles from '../../../style'
import CreateChart from './_create-chart'

export default () => {
  const classes = useStyles()

  return (
    <Toolbar variant="dense" className={clsx(classes.toolbar)}>
      <CreateChart />
    </Toolbar>
  )
}
