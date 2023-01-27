import { useContext } from 'react'
import { context as dataContext } from '../context'
import { alpha } from '@mui/material/styles'
import Container from '@mui/material/Container'
import { BoxButton } from '../../../components/fancy-buttons'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'
import { Div } from '../../../components/html-tags'
import Typography from '@mui/material/Typography'
import Loading from '../../../components/loading-circular'

export default () => {
  const { loading, data } = useContext(dataContext)

  const count = data?.catalogue.indexStats.records

  return (
    <Container>
      {loading && (
        <Fade unmountOnExit key="loading-button" in>
          <Div
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Loading
              sx={{ color: theme => alpha(theme.palette.common.white, 0.65) }}
              size={50}
              thickness={3}
            />
          </Div>
        </Fade>
      )}
      {count && (
        <Fade unmountOnExit key="welcome-button" in>
          <Grid container spacing={0} sx={{ justifyContent: 'center' }}>
            <Grid item xs={12} sx={{ zIndex: 1 }}>
              <Typography
                variant="h4"
                gutterBottom
                sx={theme => ({
                  textAlign: 'center',
                  mb: 6,
                  color: theme.palette.common.white,
                  [theme.breakpoints.down('xs')]: { fontSize: 'unset' },
                })}
              >
                Welcome to the SAEON Data Portal
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                minHeight: 100,
                display: 'flex',
                justifyContent: 'center',
              }}
              xs={7}
              md={5}
              lg={3}
            >
              <BoxButton
                sx={{ textAlign: 'center', backgroundColor: 'transparent' }}
                disabled={count === 0}
                title={`Explore ${count} datasets`}
              />
            </Grid>
          </Grid>
        </Fade>
      )}
    </Container>
  )
}
