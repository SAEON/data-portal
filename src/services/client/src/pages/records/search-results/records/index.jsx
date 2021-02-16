import Record from './record'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { isMobile } from 'react-device-detect'

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
              style={isMobile ? { padding: '16px 16px 0 16px' } : { marginBottom: 16 }}
            >
              <Record {..._source} />
            </Grid>
          )
        })}

      {/* NO Results */}
      {!results.length && (
        <Grid item xs={12} style={isMobile ? { padding: '16px 16px 0 16px' } : {}}>
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
