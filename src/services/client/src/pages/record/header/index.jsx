import { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import DataDownloadButton from '../../../components/data-download'
import { context as authorizationContext } from '../../../contexts/authorization'
import PreviewAtlasButton from '../../../components/preview-atlas-button'
import CreateDatabookButton from '../../../components/create-databook-button'
import CitationButton from '../../../components/citation-dialogue'
import CodeViewButton from './_code-view-button'
import Title from './_title'

export default _source => {
  const { isAuthenticated } = useContext(authorizationContext)

  return (
    <AppBar color="inherit" position="sticky" variant="outlined">
      <Toolbar variant="dense">
        <Grid container spacing={2} justify="flex-end">
          <Grid item xs style={{ alignSelf: 'center' }}>
            <Title {..._source} />
          </Grid>

          <Hidden xsDown>
            <CreateDatabookButton {..._source} buttonSize="medium" />
            <PreviewAtlasButton {..._source} buttonSize="medium" />
            {isAuthenticated && <CodeViewButton {..._source} />}
            <CitationButton {..._source} buttonSize="medium" />
          </Hidden>

          <DataDownloadButton color="primary" immutableResource={_source?.immutableResource} />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
