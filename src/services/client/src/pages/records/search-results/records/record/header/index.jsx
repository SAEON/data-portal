import { Toolbar, Divider } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'
import Title from './_title'
import PreviewAtlasButton from '../../../../../../components/preview-atlas-button'
import CitationButton from '../../../../../../components/citation-dialogue'
import ToggleItemButton from './_toggle-item-button'
import CreateDatabookButton from '../../../../../../components/create-databook-button'
import DataDownloadButton from '../../../../../../components/data-download'

export default ({
  showDatabook = true,
  showDownload = false,
  showPreview = true,
  showSelect = true,
  ..._source
}) => {
  const classes = useStyles()

  return (
    <Toolbar
      className={clsx(classes.toolbar)}
      disableGutters
      variant="dense"
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Title {..._source} />
      {showDatabook && <CreateDatabookButton {..._source} />}
      {showPreview && <PreviewAtlasButton {..._source} />}
      <CitationButton style={!showSelect && !showDownload ? { marginRight: 8 } : {}} {..._source} />
      {showDownload && (
        <DataDownloadButton
          style={showSelect ? {} : { marginRight: 8 }}
          size={'small'}
          immutableResource={_source?.immutableResource}
        />
      )}
      {showSelect && (
        <>
          <Divider orientation="vertical" style={{ height: 16, margin: 16 }} />
          <ToggleItemButton {..._source} />
        </>
      )}
    </Toolbar>
  )
}
