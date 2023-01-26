import { Div, A, Img } from '../../../components/html-tags'
import { alpha } from '@mui/material/styles'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

export default () => {
  return (
    <Div
      sx={{
        backgroundColor: theme => alpha(theme.palette.common.white, 1),
      }}
    >
      <Container
        sx={{
          py: theme => theme.spacing(12),
        }}
      >
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid
            item
            xs={12}
            md={6}
            sx={theme => ({
              display: 'flex',
              justifyContent: 'center',
              mb: 8,
              [theme.breakpoints.up('md')]: {
                mb: 'unset',
              },
            })}
          >
            <A sx={{ display: 'flex' }} target="_blank" href="https://www.dst.gov.za/">
              <Img
                sx={{
                  maxHeight: theme => theme.spacing(18),
                  width: 'auto',
                  display: 'block',
                  marginLeft: 'auto',
                }}
                src="/dsi.png"
                alt="Department of Science and Technology logo"
              />
            </A>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <A target="_blank" href="http://sarva.saeon.ac.za/">
              <Img
                sx={{
                  maxHeight: theme => theme.spacing(18),
                  width: 'auto',
                  display: 'block',
                  marginLeft: 'auto',
                }}
                src="/saeon-logo.png"
                alt="SAEON logo"
              />
            </A>
          </Grid>
        </Grid>
      </Container>
    </Div>
  )
}
