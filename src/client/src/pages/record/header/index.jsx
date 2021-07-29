import { useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import DataDownloadButton from '../../../components/data-download'
import { context as authorizationContext } from '../../../contexts/authorization'
import PreviewAtlasButton from '../../../components/preview-atlas-button'
import CreateDatabookButton from '../../../components/create-databook-button'
import CitationButton from '../../../components/citation-dialogue'
import CodeViewButton from './_code-view-button'
import Title from './_title'
import FancyHeader from '../../../components/toolbar-header'
import useTheme from '@material-ui/core/styles/useTheme'

export default ({ codeView, toggleCodeView, _source }) => {
  const { isAuthenticated } = useContext(authorizationContext)
  const theme = useTheme()

  return (
    <FancyHeader style={{ paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2) }}>
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
    </FancyHeader>
  )
}
