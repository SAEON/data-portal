import { Grid } from '@material-ui/core'
import Layers from './layers'
import Search from './search'

export default ({ LegendMenu, DataMenu }) => {
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Grid container direction="column" style={{ flexFlow: 'column', height: '100%' }}>
        <Grid item xs={12} style={{ flexBasis: 'unset' }}>
          <Layers DataMenu={DataMenu} LegendMenu={LegendMenu} />
        </Grid>
        <Grid item xs={12} style={{ flexBasis: 'unset' }}>
          <div style={{ margin: '32px' }} />
        </Grid>
        <Grid item xs={12}>
          <Search />
        </Grid>
      </Grid>
    </div>
  )
}
