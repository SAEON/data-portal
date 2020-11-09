import { AppBar, Toolbar, Grid, Hidden } from '@material-ui/core'
import DataDownloadButton from '../../../components/data-download'
import AtlasButton from './_atlas-button'
import DatabookButton from './_databook-button'
import CitationButton from './_citation-button'
import CodeViewButton from './_code-view-button'
import Title from './_title'

export default _source => {
  return (
    <AppBar color="inherit" position="sticky" variant="outlined">
      <Toolbar variant="dense">
        <Grid container spacing={2} justify="flex-end">
          <Grid item xs style={{ alignSelf: 'center' }}>
            <Title {..._source} />
          </Grid>

          <Hidden xsDown>
            <DatabookButton {..._source} />
            <AtlasButton {..._source} />
            <CodeViewButton {..._source} />
            <CitationButton {..._source} />
          </Hidden>

          <DataDownloadButton color="primary" immutableResource={_source?.immutableResource} />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
