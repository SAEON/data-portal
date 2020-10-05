import React from 'react'
import { Records } from '../../components'
import Header from './header'
import { isMobile } from 'react-device-detect'

export default () => {
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100%',
        }}
      >
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'block', width: '100%' }}>
            <Header />
          </div>
        </div>
        <div style={{ display: 'flex', flexGrow: 1 }}>
          <div style={{ display: 'block', width: '100%' }}>
            <Records hideSidebar={isMobile ? true : false} />
          </div>
        </div>
      </div>
    </div>
  )
}
