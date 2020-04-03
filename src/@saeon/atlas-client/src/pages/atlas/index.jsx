import 'ol/ol.css'
import React from 'react'
import TopBar from './_top-bar'
import SearchMenu from './_search-menu'
import MapMenu from './_map-menu'
import ConfigMenu from './_config-menu'

export default () => (
  <>
    <TopBar />
    <SearchMenu />
    <MapMenu />
    <ConfigMenu />
  </>
)
