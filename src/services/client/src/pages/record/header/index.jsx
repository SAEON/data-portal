import { useContext, memo } from 'react'
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

export default ({ codeView, toggleCodeView, _source }) => {
  const { isAuthenticated } = useContext(authorizationContext)

  return (
    <AppBar color="inherit" position="sticky" variant="outlined">
      <Toolbar variant="dense">
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs style={{ alignSelf: 'center' }}>
            <Title {..._source} />
          </Grid>

          <PreviewAtlasButton {..._source} buttonSize="medium" />

          <Hidden xsDown>
            <CreateDatabookButton {..._source} buttonSize="medium" />
            {isAuthenticated && (
              <CodeViewButton codeView={codeView} toggleCodeView={toggleCodeView} />
            )}
            <CitationButton {..._source} buttonSize="medium" />
          </Hidden>

          <DataDownloadButton buttonProps={{ color: 'primary' }} {..._source} />
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
