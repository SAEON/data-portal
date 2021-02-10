import { Toolbar, Divider } from '@material-ui/core'
import clsx from 'clsx'
import useStyles from './style'
import Title from './_title'
import AtlasButton from './atlas-button'
import CitationButton from './_citation-button'
import ToggleItemButton from './_toggle-item-button'
import DatabookButton from './_databook-button'
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
      {showDatabook && <DatabookButton {..._source} />}
      {showPreview && <AtlasButton {..._source} />}
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
