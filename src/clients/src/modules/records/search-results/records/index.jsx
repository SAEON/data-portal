import Record from './record'
import Grid from '@mui/material/Grid'
import Paper_ from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'

const Paper = styled(props => <Paper_ variant="outlined" {...props} />)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.85),
  p: 0,
}))

export default ({ results }) => {
  return (
    <Grid
      component={Paper}
      container
      item
      xs={12}
      sx={theme => ({
        mb: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
          mb: theme.spacing(2),
        },
      })}
    >
      {/* Results */}
      {Boolean(results.length) &&
        results.map(({ metadata }, i, arr) => {
          const { _source } = metadata
          return (
            <Grid
              key={_source.id}
              item
              xs={12}
              sx={theme => ({
                mb: 0,
                mt: theme.spacing(1),
                pr: theme.spacing(1),
                pb: theme.spacing(1),
                pl: theme.spacing(1),
                borderBottom: `1px solid ${theme.palette.divider}`,
                ':last-child': {
                  borderBottom: 'unset',
                },
                [theme.breakpoints.up('md')]: {
                  mt: 0,
                  pr: 0,
                  pl: 0,
                },
                transition: theme.transitions.create(['background-color']),
                '&:hover': {
                  backgroundColor: theme.palette.common.white,
                },
              })}
            >
              <Record i={i} length={arr.length} {..._source} />
            </Grid>
          )
        })}

      {/* NO Results */}
      {!results.length && (
        <Grid item xs={12} sx={{}}>
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
}
