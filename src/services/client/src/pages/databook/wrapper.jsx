import useStyles from './style'
import clsx from 'clsx'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ children }) => {
  const theme = useTheme()
  const classes = useStyles()

  return (
    <div
      style={{ backgroundColor: theme.palette.common.white }}
      className={clsx(classes.layout, {
        [classes.pushDown]: !window.location.pathname.includes('/render'),
      })}
    >
      {children}
    </div>
  )
}
