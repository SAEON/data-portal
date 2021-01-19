import clsx from 'clsx'
import { Toolbar } from '@material-ui/core'
import useStyles from '../../../style'
// import CreateChart from './_create-chart'

export default () => {
  const classes = useStyles()

  return (
    <Toolbar variant="dense" className={clsx(classes.toolbar)}>
      {/* <CreateChart /> //to be deleted once its decided what will remain of this empty toolbar. ./_create-chart.jsx is to be deleted too*/}
    </Toolbar>
  )
}
