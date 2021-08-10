import { useMemo } from 'react'
import Record from './record'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ results }) => {
  const theme = useTheme()
  const smDown = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const style = useMemo(
    () => ({
      marginBottom: smDown ? theme.spacing(0) : theme.spacing(2),
      paddingTop: smDown ? theme.spacing(1) : 0,
      paddingRight: smDown ? theme.spacing(1) : 0,
      paddingBottom: smDown ? theme.spacing(0) : 0,
      paddingLeft: smDown ? theme.spacing(1) : 0,
    }),
    [smDown, theme]
  )

  return (
    <Grid container item xs={12}>
      {/* Results */}
      {Boolean(results.length) &&
        results.map(({ metadata }) => {
          const { _source } = metadata
          return (
            <Grid key={_source.id} item xs={12} style={style}>
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
