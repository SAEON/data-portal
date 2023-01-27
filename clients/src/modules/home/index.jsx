import { useState, useContext } from 'react'
import { context as layoutContext } from '../../contexts/layout'
import SkipLink from '../../components/skip-link'
import Search from './search'
import { alpha } from '@mui/material/styles'
import { Div } from '../../components/html-tags'
import Header from './header'
import Map from './map'
import Stats from './stats'
import Partners from './partners'
import Provider from './context'
import Fade from '@mui/material/Fade'

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
            ref={el => setRef(el)}
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              '&.maplibregl-map': {
                position: 'absolute',
              },
            }}
          >
            {ref && <Map mapContainer={ref} />}
          </Div>

          {/* OVERLAY */}
          <Fade in>
            <Div
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: theme => alpha(theme.palette.common.black, 0.5),
              }}
            />
          </Fade>
          <Search />
          <Stats />
          <Partners />
        </Div>
      </Div>
    </Provider>
  )
}
