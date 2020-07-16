import React from 'react'
import Results from './layout/catalogue-results-view'
import PageHeader from './layout/page-header'

export default () => {
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div style={{ height: '100%' }}>
        <PageHeader />
        <Results />
      </div>
    </div>
  )
}
