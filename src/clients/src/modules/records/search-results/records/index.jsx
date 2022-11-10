import Record from './record'
import Grid from '@mui/material/Grid'
import Paper_ from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { alpha } from '@mui/material/styles'
import { Div } from '../../../../components/html-tags'
import Tools from './record/tools'

const Paper = styled(props => <Paper_ variant="outlined" {...props} />)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.white, 0.9),
  p: 0,
}))

export default ({ results }) => {
  return (
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
        results.map(({ metadata }, i, arr) => {
          const { _source } = metadata
          return (
            <Grid
              key={_source.id}
              component={Paper}
              item
              xs={12}
              sx={theme => ({
                display: 'flex',
                position: 'relative',
                mb: 0,
                pr: theme.spacing(1),
                pb: theme.spacing(1),
                pl: theme.spacing(1),
                overflow: 'hidden',
                ':last-child': {
                  mb: 0,
                },
                [theme.breakpoints.up('md')]: {
                  mb: theme.spacing(1),
                  mx: 0,
                  mt: 0,
                  pr: 0,
                  pl: 0,
                },
                transition: theme.transitions.create(['background-color']),
                '&:hover': {
                  backgroundColor: theme.palette.common.white,
                  '& > .record-tools': {
                    backgroundColor: theme.palette.common.white,
                    right: 0,
                    outline: theme => `1px solid ${theme.palette.divider}`,
                    boxShadow: theme => theme.shadows[2],
                  },
                },
              })}
            >
              <Div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: '100%',
                }}
              >
                <Record i={i} length={arr.length} {..._source} />
              </Div>
              <Div
                className="record-tools"
                sx={{
                  position: 'absolute',
                  transition: theme =>
                    theme.transitions.create(['right', 'background-color', 'outline', 'boxShadow']),
                  boxShadow: 'none',
                  outline: `1px solid transparent`,
                  right: -108,
                  top: 0,
                }}
              >
                <Tools {..._source} />
              </Div>
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
