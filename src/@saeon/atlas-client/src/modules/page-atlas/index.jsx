import 'ol/ol.css'
import React from 'react'
import SearchMenu from './_search-menu'
import MapMenu from './_map-menu'
import AboutMenu from './_about-menu'
import { Fade } from '@material-ui/core'
// import ScreenshotMenu from './_screenshot-menu'

export default () => (
  <Fade in={true}>
    <>
      <SearchMenu />
      <MapMenu />
      <AboutMenu />
      {/* <ScreenshotMenu/> */}
    </>
  </Fade>
)
