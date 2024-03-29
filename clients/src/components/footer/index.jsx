import { useMemo, useContext } from 'react'
import { context as backgroundContext } from '../../contexts/background-image'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import PageRoutes from './_page-routes'
import Legal from './_legal'
import Grid from '@mui/material/Grid'
import Contact from './_contact'
import SourceCode from './_source-code'
import { Footer } from '../html-tags'
import Link from '@mui/material/Link'
import FundingPartners from './_funding-partners'

export default ({ routes }) => {
  const {
    image: { name },
  } = useContext(backgroundContext)
  const _routes = useMemo(() => routes.filter(({ includeInFooter }) => includeInFooter))
  const [photographer, unsplashId] = name.replace(/-unsplash.*/, '').split('~')

  return (
    <Footer sx={{ position: 'relative' }}>
      <AppBar
        variant="outlined"
        elevation={0}
        position="relative"
        sx={{ backgroundColor: theme => theme.palette.grey[800] }}
      >
        {/* MAIN */}
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <Container
            sx={{ paddingTop: theme => theme.spacing(4), paddingBottom: theme => theme.spacing(4) }}
          >
            <Grid container spacing={4}>
              <Grid container item xs={12} sm={3}>
                <PageRoutes routes={_routes} />
              </Grid>
              <Grid container item xs={12} sm={3}>
                <Legal routes={_routes} />
                <SourceCode routes={_routes} />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Contact routes={_routes} />
              </Grid>
              <Grid container item xs={12} sm={3}>
                <FundingPartners />
              </Grid>
            </Grid>
          </Container>

          {/* BG IMAGE ATTRIBUTION */}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`https://unsplash.com/photos/${unsplashId}`}
            sx={{
              placeSelf: 'end',
              fontSize: '0.75rem',
              mr: 1,
              mb: 1,
              color: theme => theme.palette.common.white,
            }}
            variantMapping={{ overline: 'p' }}
          >
            Photo by{' '}
            {photographer
              .split('-')
              .map(s => s?.capitalize())
              .join(' ')}{' '}
            - unsplash.com
          </Link>
        </Toolbar>

        {/* COPYRIGHT */}
        <Toolbar
          variant="dense"
          sx={{ backgroundColor: theme => theme.palette.grey[900], minHeight: 1, diplay: 'flex' }}
        >
          <Container sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="overline" variantMapping={{ overline: 'p' }}>
              © SAEON 2020 - {new Date().getFullYear()}
            </Typography>
          </Container>
        </Toolbar>
      </AppBar>
    </Footer>
  )
}
