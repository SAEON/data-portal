import 'maplibre-gl/dist/maplibre-gl.css'
import { useState, useContext } from 'react'
import { context as layoutContext } from '../../contexts/layout'
import SkipLink from '../../components/skip-link'
import Container from '@mui/material/Container'
import Search from './search'
import Overlay from '../../components/animated-overlay'
import { Div } from '../../components/html-tags'
import Header from './header'
import Map from './map'
import Stats from './stats'
import Grid from '@mui/material/Grid'
import Provider from './context'

export default () => {
  const [ref, setRef] = useState(null)
  const { headerRef } = useContext(layoutContext)

  return (
    <Provider>
      <SkipLink href="#home-search" text="Skip to main content" />
      <Header />

      {/* MAP */}
      <Div sx={{ display: 'flex', height: `calc(100vh - ${headerRef?.offsetHeight}px - 48px)` }}>
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
          {/* MAP */}
          <Div
            id="home-map"
            ref={el => setRef(el)}
            sx={theme => ({
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              '&.maplibregl-map': {
                position: 'absolute',
              },
              [theme.breakpoints.up('sm')]: {
                '& #mobile-dot': {
                  display: 'none',
                },
                '& .maplibregl-ctrl-bottom-right': {
                  display: 'flex',
                  width: '100%',
                  '& details': {
                    flex: 1,
                    '& .maplibregl-ctrl-attrib-inner': {
                      display: 'flex',
                      '& span': {
                        marginLeft: 'auto',
                      },
                    },
                  },
                },
              },
            })}
          >
            {ref && <Map mapContainer={ref} />}
          </Div>

          {/* OVERLAY */}
          <Overlay />

          {/* CONTENTS */}
          <Container>
            <Grid container spacing={0} sx={{ justifyContent: 'center' }}>
              <Search />
            </Grid>
          </Container>
          <Stats />
        </Div>
      </Div>
    </Provider>
  )
}
