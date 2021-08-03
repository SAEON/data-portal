import Tooltip from '@material-ui/core/Tooltip'
import Link from '@material-ui/core/Link'
import clsx from 'clsx'
import useStyles from './style'
import { CATALOGUE_API_ADDRESS } from '../../../../config'
import useMediaQuery from '@material-ui/core/useMediaQuery'

export default ({ userInfo, style }) => {
  const xsDown = useMediaQuery(theme => theme.breakpoints.down('xs'))
  const classes = useStyles()
  return (
    <Tooltip title="Logout of the SAEON Data Portal">
      <span style={style}>
        <Link
          className={clsx(classes.link)}
          color="inherit"
          variant="overline"
          href={`${CATALOGUE_API_ADDRESS}/logout?redirect=${window.location.href}`}
        >
          Logout{xsDown ? '' : ` ${userInfo.username}`}
        </Link>
      </span>
    </Tooltip>
  )
}
