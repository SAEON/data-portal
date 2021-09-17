import Row from '../_row'
import Grid from '@material-ui/core/Grid'
import Chip from '@material-ui/core/Chip'

export default ({ immutableResource }) => {
  const { _archive = undefined, _fileFormat = undefined } = immutableResource || {}

  return (
    <Row title="Resource type">
      <Grid container spacing={1} justifyContent="flex-start">
        {_archive === true && (
          <Grid item>
            <Chip size="small" color="primary" clickable={false} label={'ARCHIVE'} />
          </Grid>
        )}
        {_fileFormat && (
          <Grid item>
            <Chip
              size="small"
              color="primary"
              clickable={false}
              label={_fileFormat.toUpperCase()}
            />
          </Grid>
        )}
      </Grid>
    </Row>
  )
}
