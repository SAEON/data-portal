import React from 'react'
import { Divider, Grid } from '@material-ui/core'

// Tab panels
import LayerList from './layer-list'
import Search from './search'

export default () => {
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Grid container direction="column" style={{ flexFlow: 'column', height: '100%' }}>
        <Grid item xs={12} style={{ flexBasis: 'unset' }}>
          <LayerList />
        </Grid>
        <Grid item xs={12} style={{ flexBasis: 'unset' }}>
          <Divider variant="middle" style={{ margin: 16 }} />
        </Grid>
        <Grid item xs={12}>
          <Search />
        </Grid>
      </Grid>
    </div>
  )
}
