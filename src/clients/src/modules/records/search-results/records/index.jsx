import Record from './record'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

export default ({ results }) => {
  return (
    <Grid container item xs={12}>
      {/* Results */}
      {Boolean(results.length) &&
        results.map(({ metadata }) => {
          const { _source } = metadata
          return (
            <Grid
              key={_source.id}
              item
              xs={12}
              sx={theme => ({
                mb: theme.spacing(0),
                mt: theme.spacing(1),
                pr: theme.spacing(1),
                pb: theme.spacing(0),
                pl: theme.spacing(1),
                [theme.breakpoints.up('md')]: {
                  mb: theme.spacing(2),
                  mt: 0,
                  pr: 0,
                  pb: 0,
                  pl: 0,
                },
              })}
            >
              <Record {..._source} />
            </Grid>
          )
        })}

      {/* NO Results */}
      {!results.length && (
        <Grid item xs={12} style={style}>
          <Card variant="outlined">
            <Typography
              style={{ margin: 20, display: 'block', textAlign: 'center' }}
              variant="overline"
            >
              No results found
            </Typography>
          </Card>
        </Grid>
      )}
    </Grid>
  )
}
