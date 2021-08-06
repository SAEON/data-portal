import RenderChart from '../../components/chart-controller'
import useStyles from './style'
import clsx from 'clsx'

export default ({ id }) => {
  const classes = useStyles()

  return (
    <div
      className={clsx(classes.layout)}
      style={window.location.pathname.includes('/render') ? {} : { marginTop: 48 }}
    >
      <RenderChart id={id} />
    </div>
  )
}
