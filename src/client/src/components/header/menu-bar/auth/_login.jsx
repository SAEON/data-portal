import Link from '@material-ui/core/Link'
import { Link as RouterLink } from 'react-router-dom'
import clsx from 'clsx'
import useStyles from './style'

export default () => {
  const classes = useStyles()

  return (
    <Link
      to={`/login?redirect=${window.location.href}`}
      component={RouterLink}
      className={clsx(classes.link)}
      color="inherit"
      variant="overline"
    >
      Login
    </Link>
  )
}
