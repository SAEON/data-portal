import Link from '@material-ui/core/Link'
import clsx from 'clsx'
import useStyles from './style'
import { API_PUBLIC_ADDRESS } from '../../../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default ({ user }) => {
  const xsDown = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const classes = useStyles()
  return (
    <Link
      className={clsx(classes.link)}
      color="inherit"
      variant="overline"
      href={`${API_PUBLIC_ADDRESS}/logout?redirect=${window.location.href}`}
    >
      Logout{xsDown ? '' : ` ${user.name || user.emailAddress}`}
    </Link>
  )
}
