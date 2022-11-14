import PreviewAtlasButton from '../../../../../../components/preview-atlas-button'
import CitationButton from '../../../../../../components/citation-dialogue'
import DataDownloadButton from '../../../../../../components/data-download'
import ToggleItemButton from './_toggle-item-button'
import Hidden from '@mui/material/Hidden'

export default ({ onClose, ..._source }) => {
  return (
    <>
      <ToggleItemButton {..._source} />
      <PreviewAtlasButton onClose={onClose} {..._source} />
      <CitationButton onClose={onClose} doi={_source.doi} />
      <Hidden smDown>
        <DataDownloadButton
          onClose={onClose}
          title="Download data"
          buttonProps={{ style: {} }}
          {..._source}
        />
      </Hidden>
    </>
  )
}
