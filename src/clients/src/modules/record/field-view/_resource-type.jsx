import Row from '../_row'
import Grid from '@mui/material/Grid'
import Chip from '@mui/material/Chip'

export default ({ immutableResource }) => {
  const { _archive = undefined, _fileFormat = undefined } = immutableResource || {}

  return (
    <Row title="Resource type">
      <Grid container spacing={1} justifyContent="flex-start">
        {_archive === true && (
          <Grid item>
            <Chip size="small" label={'ARCHIVE'} />
          </Grid>
        )}
        {_fileFormat && (
          <Grid item>
            <Chip size="small" label={_fileFormat.toUpperCase()} />
          </Grid>
        )}
      </Grid>
    </Row>
  )
}
