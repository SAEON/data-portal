import 'ol/ol.css'
import React from 'react'
import SearchMenu from './modules/layout/search-menu'
import MapMenu from './modules/layout/map-menu'
import AboutMenu from './modules/layout/about-menu'
import { Fade } from '@material-ui/core'
// import ScreenshotMenu from './modules/layout/screenshot-menu'

export default () => (
  <Fade in={true}>
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, zIndex: 1 }}>
        <SearchMenu />
        <MapMenu />
        <AboutMenu />
        {/* <ScreenshotMenu/> */}
      </div>
    </div>
  </Fade>
)
