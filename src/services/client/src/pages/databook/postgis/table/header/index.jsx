import clsx from 'clsx'
import { Toolbar } from '@material-ui/core'
import useStyles from '../../../style'
import CreateChart from './_create-chart'

export default ({ data }) => {
  const classes = useStyles()
  //STEVEN TO-DO: retrieve data(sqlResult) from context rather
  return (
    <Toolbar variant="dense" className={clsx(classes.toolbar)}>
      <CreateChart data={data} />
    </Toolbar>
  )
}
