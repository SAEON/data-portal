import React from 'react'
import Results from './results'
import SearchBar from './search-bar'
import { isMobile } from 'react-device-detect'

export default ({ showSearchBar = false, ...props } = {}) => {
  console.log('rendering /records')
  return showSearchBar ? (
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
          <SearchBar />
        </div>
      </div>
      <div style={{ display: 'flex', flexGrow: 1 }}>
        <div style={{ display: 'block', width: '100%' }}>
          <Results {...props} hideSidebar={isMobile ? true : false} />
        </div>
      </div>
    </div>
  ) : (
    <Results {...props} hideSidebar={isMobile ? true : false} />
  )
}
