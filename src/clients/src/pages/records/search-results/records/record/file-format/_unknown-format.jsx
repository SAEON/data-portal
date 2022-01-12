import { useContext } from 'react'
import { context as authorizationContext } from '../../../../../../contexts/authorization'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import UpdateDataFormat from '../../../../../../components/update-data-format'

export default ({ id, immutableResource }) => {
  const { hasPermission } = useContext(authorizationContext)

  if (!hasPermission('es-index:update')) {
    return (
      <Typography sx={{ fontSize: '0.6rem' }} variant="overline">
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
            sx={{ fontSize: '0.6rem' }}
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
