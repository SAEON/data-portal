import Grid from '@mui/material/Grid'
import Layers from './layers'

export default ({ setActiveTabIndex, LegendMenu, DataMenu }) => {
  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Grid container direction="column" style={{ flexFlow: 'column', height: '100%' }}>
        <Grid item xs={12} style={{ flexBasis: 'unset' }}>
          <Layers
            setActiveTabIndex={setActiveTabIndex}
            DataMenu={DataMenu}
            LegendMenu={LegendMenu}
          />
        </Grid>
      </Grid>
    </div>
  )
}
