import { useContext } from 'react'
import Hidden from '@mui/material/Hidden'
import DataDownloadButton from '../../../components/data-download'
import { context as authorizationContext } from '../../../contexts/authorization'
import PreviewAtlasButton from '../../../components/preview-atlas-button'
import CitationButton from '../../../components/citation-dialogue'
import CodeViewButton from './_code-view-button'
import Title from './_title'
import FancyHeader from '../../../components/toolbar-header'
import { useTheme } from '@mui/material/styles'
import { Div } from '../../../components/html-tags'

export default ({ codeView, toggleCodeView, _source }) => {
  const { isAuthenticated } = useContext(authorizationContext)
  const theme = useTheme()

  return (
    <FancyHeader
      style={{ paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2), display: 'flex' }}
    >
      <Title {..._source} />
      <Div sx={{ marginRight: 'auto' }} />

      <PreviewAtlasButton {..._source} buttonSize="medium" />

      <Hidden smDown>
        {isAuthenticated && <CodeViewButton codeView={codeView} toggleCodeView={toggleCodeView} />}
        <CitationButton doi={_source.doi} buttonSize="medium" />
      </Hidden>

      <Hidden smDown>
        <DataDownloadButton buttonProps={{ color: 'primary' }} {..._source} />
      </Hidden>
    </FancyHeader>
  )
}
