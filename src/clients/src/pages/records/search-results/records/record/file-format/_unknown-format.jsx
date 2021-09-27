import { useContext } from 'react'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import useStyles from '../style'
import clsx from 'clsx'
import UpdateDataFormat from '../../../../../../components/update-data-format'

export default ({ id, immutableResource }) => {
  const { hasPermission } = useContext(authorizationContext)
  const classes = useStyles()

  if (!hasPermission('es-index:update')) {
    return (
      <Typography className={clsx(classes.fileFormatText)} variant="overline">
        Unknown data format
      </Typography>
    )
  }

  return (
    <UpdateDataFormat
      id={id}
      immutableResource={immutableResource}
      Button={({ open, setOpen }) => (
        <Tooltip placement="top" title="Update this record to include format information">
          <Link
            style={{ cursor: 'pointer' }}
            onClick={() => setOpen(!open)}
            className={clsx(classes.fileFormatText)}
            component={Typography}
            variant="overline"
          >
            Update data format (beta)
          </Link>
        </Tooltip>
      )}
    />
  )
}
