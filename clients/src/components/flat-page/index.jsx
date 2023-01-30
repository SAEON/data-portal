import { useContext } from 'react'
import { context as layoutContext } from '../../contexts/layout'
import { Div } from '../html-tags'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import AnimatedOverlay from '../animated-overlay'
import Grid from '@mui/material/Grid'
import Fade from '@mui/material/Fade'

export default ({ title, children }) => {
  const { headerRef } = useContext(layoutContext)
  return (
    <Div
      sx={{
        display: 'flex',
        minHeight: theme => `calc(100vh - ${headerRef?.offsetHeight}px - ${theme.spacing(3)})`,
        py: 3,
      }}
    >
      <AnimatedOverlay />
      <Div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Container sx={{ zIndex: 1 }}>
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
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Fade>

          {children}
        </Container>
      </Div>
    </Div>
  )
}

export const H = props => (
  <Typography
    sx={theme => ({
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
      color: theme => theme.palette.common.white,
    })}
    variant="h6"
    {...props}
  />
)

export const P = props => (
  <Typography
    sx={theme => ({
      marginBottom: theme.spacing(2),
      color: theme => theme.palette.common.white,
    })}
    variant="body2"
    {...props}
  />
)
