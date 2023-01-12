import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Record, { Wrapper, Paper } from './record'

export default ({ results }) => (
  <Grid
    container
    item
    xs={12}
    sx={theme => ({
      mb: 0,
      [theme.breakpoints.up('md')]: {
        mb: theme.spacing(2),
      },
    })}
  >
    {/* Results */}
    {Boolean(results.length) &&
      results.map(({ metadata, downloadCount }, i, arr) => {
        const { _source } = metadata
        return (
          <Wrapper downloadCount={downloadCount} key={_source.id} {..._source}>
            <Record i={i} length={arr.length} {..._source} />
          </Wrapper>
        )
      })}

    {/* NO Results */}
    {!results.length && (
      <Grid
        item
        xs={12}
        sx={{
          '&:hover': {
            backgroundColor: theme => theme.palette.common.white,
          },
        }}
        component={Paper}
      >
        <Typography
          sx={{ m: theme => theme.spacing(5), display: 'block', textAlign: 'center' }}
          variant="overline"
        >
          No results found
        </Typography>
      </Grid>
    )}
  </Grid>
)
