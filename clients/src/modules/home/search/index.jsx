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
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        <Grid
          container
          item
          sx={{
            minHeight: theme => theme.spacing(24),
            display: 'flex',
            justifyContent: 'center',
          }}
          xs={12}
          md={10}
          lg={8}
        >
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
              <Div sx={{ width: '100%' }}>
                <BoxButton
                  sx={{ textAlign: 'center', backgroundColor: 'white' }}
                  disabled={count === 0}
                  title={
                    <>
                      <Typography
                        gutterBottom
                        sx={{
                          color: theme => theme.palette.primary.main,
                          fontSize: '1.5rem',
                          outline: 'unset !important',
                        }}
                      >
                        Welcome to the SAEON Data Portal
                      </Typography>
                      <Typography
                        sx={{
                          color: theme => theme.palette.primary.main,
                          outline: 'unset !important',
                        }}
                      >
                        Explore {count} datasets
                      </Typography>
                    </>
                  }
                />
              </Div>
            </Fade>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
