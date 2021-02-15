import { CardContent, Typography } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'

export default ({ immutableResource }) => {
  const { _archive = undefined, _fileFormat = undefined } = immutableResource || {}
  const classes = useStyles()

  return (
    <CardContent className={clsx(classes.fileFormat)}>
      <Typography className={clsx(classes.fileFormatText)} variant="overline">
        {`${_fileFormat?.toUpperCase() === 'UNKNOWN' ? `Unknown data format` : _fileFormat} ${
          _archive === true ? '(Archive)' : ''
        }`.truncate(150)}
      </Typography>
    </CardContent>
  )
}
