import ResultItem from './item'
import { Card, Grid, Typography } from '@material-ui/core'
import { isMobile } from 'react-device-detect'

const CARD_BG_COLOUR = 'rgba(255,255,255,0.85)'

export default ({ results }) => {
  return (
    <Grid container item xs={12}>
      {results.length ? (
        results.map(item => {
          const { _source } = item.metadata

          return (
            <Grid
              key={_source.id}
              item
              xs={12}
              style={isMobile ? { padding: '16px 16px 0 16px' } : { marginBottom: 16 }}
            >
              <ResultItem {..._source} />
            </Grid>
          )
        })
      ) : (
        <Grid item xs={12} style={isMobile ? { padding: '16px 16px 0 16px' } : {}}>
          <Card style={{ backgroundColor: CARD_BG_COLOUR }} variant="outlined">
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
