import { Link, Tooltip } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'
import { CATALOGUE_API_ADDRESS } from '../../../config'

export default () => {
  const classes = useStyles()
  return (
    <Tooltip title="Login to the SAEON Data Portal">
      <Link
        className={clsx(classes.link)}
        color="inherit"
        variant="overline"
        href={`${CATALOGUE_API_ADDRESS}/login`}
      >
        Login
      </Link>
    </Tooltip>
  )
}