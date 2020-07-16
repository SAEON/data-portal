import React from 'react'
import { Grid } from '@material-ui/core'
import Sidebar from './layout/sidebar'
import Results from './layout/catalogue-results-view'
import Header from './layout/header'

export default () => {
  return (
    <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
      <div style={{ height: '100%' }}>
        <Header />
        <Grid container spacing={0}>
          <Sidebar />
          <Results />
        </Grid>
      </div>
    </div>
  )
}
