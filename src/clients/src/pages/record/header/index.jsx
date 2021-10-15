import { useContext } from 'react'
import Hidden from '@mui/material/Hidden'
import DataDownloadButton from '../../../components/data-download'
import { context as authorizationContext } from '../../../contexts/authorization'
import PreviewAtlasButton from '../../../components/preview-atlas-button'
import CreateDatabookButton from '../../../components/create-databook-button'
import CitationButton from '../../../components/citation-dialogue'
import CodeViewButton from './_code-view-button'
import Title from './_title'
import FancyHeader from '../../../components/toolbar-header'
import { useTheme } from '@mui/material/styles'
import UpdateDataFormat from '../../../components/update-data-format'
import Tooltip from '@mui/material/Tooltip'
import UpdateIcon from 'mdi-react/DatabaseEditIcon'
import IconButton from '@mui/material/IconButton'

export default ({ codeView, toggleCodeView, _source }) => {
  const { isAuthenticated, hasPermission } = useContext(authorizationContext)
  const theme = useTheme()

  const canUpdateIndex = hasPermission('es-index:update')

  return (
    <FancyHeader
      style={{ paddingLeft: theme.spacing(2), paddingRight: theme.spacing(2), display: 'flex' }}
    >
      <Title {..._source} />
      <div style={{ marginRight: 'auto' }} />

      <PreviewAtlasButton {..._source} buttonSize="medium" />

      {canUpdateIndex && (
        <UpdateDataFormat
          {..._source}
          Button={({ open, setOpen }) => (
            <Tooltip placement="top" title="Update this record to include format information">
              <IconButton style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)} size="large">
                <UpdateIcon size={22} />
              </IconButton>
            </Tooltip>
          )}
        />
      )}

      <Hidden smDown>
        <CreateDatabookButton {..._source} buttonSize="medium" />
        {isAuthenticated && <CodeViewButton codeView={codeView} toggleCodeView={toggleCodeView} />}
        <CitationButton {..._source} buttonSize="medium" />
      </Hidden>

      <Hidden smDown>
        <DataDownloadButton buttonProps={{ color: 'primary' }} {..._source} />
      </Hidden>
    </FancyHeader>
  )
}
