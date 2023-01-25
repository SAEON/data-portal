import { useState, useRef } from 'react'
import SkipLink from '../../components/skip-link'
import Search from './search'
import { alpha } from '@mui/material/styles'
import { Div } from '../../components/html-tags'
import Header from './header'
import Map from './map'
import ScrollButton from './_scroll-button'
import Stats from './stats'

export default () => {
  const [ref, setRef] = useState(null)
  const contentRef = useRef(null)

  return (
    <>
      <Header />

      <Div
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
        <Div
          sx={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: theme => alpha(theme.palette.common.black, 0.4),
          }}
        >
          <ScrollButton contentRef={contentRef} />
        </Div>
        <SkipLink href="#home-search" text="Skip to main content" />
        <Search />
      </Div>

      {/* <Div ref={contentRef}>
        <Stats />
      </Div> */}
    </>
  )
}
