import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import UnknownFormat from './_unknown-format.jsx'

export default ({ id, immutableResource }) => {
  const { _archive = undefined, _fileFormat = undefined } = immutableResource || {}

  const unknown = _fileFormat?.toUpperCase() === 'UNKNOWN'

  return (
    <CardContent
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: 0,
        paddingBottom: `0 !important`
      }}
    >
      {unknown ? (
        <UnknownFormat id={id} immutableResource={immutableResource} />
      ) : (
        <Typography sx={{ fontSize: '0.6rem' }} variant="overline">
          {`${_fileFormat} ${_archive === true ? '(Archive)' : ''}`.truncate(150)}
        </Typography>
      )}
    </CardContent>
  )
}
