import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import useStyles from '../style'
import UnknownFormat from './_unknown-format.jsx'

export default ({ id, immutableResource }) => {
  const { _archive = undefined, _fileFormat = undefined } = immutableResource || {}
  const classes = useStyles()
  const unknown = _fileFormat?.toUpperCase() === 'UNKNOWN'

  return (
    <CardContent className={clsx(classes.fileFormat)}>
      {unknown ? (
        <UnknownFormat id={id} immutableResource={immutableResource} />
      ) : (
        <Typography className={clsx(classes.fileFormatText)} variant="overline">
          {`${_fileFormat} ${_archive === true ? '(Archive)' : ''}`.truncate(150)}
        </Typography>
      )}
    </CardContent>
  )
}
