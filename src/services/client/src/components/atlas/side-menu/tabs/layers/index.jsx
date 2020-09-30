import React, { useContext } from 'react'
import { Divider, Grid } from '@material-ui/core'
import { AtlasContext } from '../../../state'

// Tab panels
import LayerList from './layer-list'
import Search from './search'

export default () => {
  const { layers } = useContext(AtlasContext)
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Grid container direction="column">
        <Grid item xs={12}>
          <LayerList />
        </Grid>
        <Grid item xs={12}>
          <Divider variant="middle" style={{ margin: 16 }} />
        </Grid>
        <Grid item xs={12}>
          <div
            style={{
              height: layers?.length * 124 > 1000 ? 1000 + 71 + 16 : layers?.length * 124 + 71 + 16,
            }}
          >
            <Search />
          </div>
        </Grid>
      </Grid>
    </div>
  )
}
