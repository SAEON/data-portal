import React from 'react'
import { CatalogueResultsView } from '../../components'
import Header from './header'
import { isMobile } from 'react-device-detect'

export default () => {
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div style={{ height: '100%' }}>
        <Header />
        <CatalogueResultsView hideSidebar={isMobile ? true : false} />
      </div>
    </div>
  )
}
