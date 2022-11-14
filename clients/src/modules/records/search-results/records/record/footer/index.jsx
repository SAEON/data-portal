import Typography from '@mui/material/Typography'
import UnknownFormat from './_unknown-format.jsx'
import Authors from '../_authors'
import { Div } from '../../../../../../components/html-tags/index.jsx'
import Divider from '@mui/material/Divider'

export default ({ id, immutableResource, ..._source }) => {
  const { _archive = undefined, _fileFormat = undefined } = immutableResource || {}

  const unknown = _fileFormat?.toUpperCase() === 'UNKNOWN'

  return (
    <Div
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mx: theme => theme.spacing(2),
      }}
    >
      <Authors
        {..._source}
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: '0.6rem',
          pr: theme => theme.spacing(2),
        }}
      />
      <Divider
        variant="middle"
        orientation="vertical"
        flexItem
        sx={{ ml: 'auto', mr: theme => theme.spacing(2) }}
      />
      {unknown ? (
        <UnknownFormat id={id} immutableResource={immutableResource} />
      ) : (
        <Typography sx={{ fontSize: '0.6rem' }} variant="overline">
          {`${_fileFormat} ${_archive === true ? '(Archive)' : ''}`.truncate(150)}
        </Typography>
      )}
    </Div>
  )
}
