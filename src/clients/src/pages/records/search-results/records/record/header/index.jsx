import { lazy, Suspense } from 'react'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import Title from './_title'
import PreviewAtlasButton from '../../../../../../components/preview-atlas-button'
import CitationButton from '../../../../../../components/citation-dialogue'
import LoadingCircular from '../../../../../../components/loading-circular'
import ToggleItemButton from './_toggle-item-button'
import Hidden from '@mui/material/Hidden'

const DataDownloadButton = lazy(() => import('../../../../../../components/data-download'))
const CreateDatabookButton = lazy(() =>
  import('../../../../../../components/create-databook-button')
)

export default ({
  showDatabook = true,
  showDownload = false,
  showPreview = true,
  showSelect = true,
  ..._source
}) => {
  return (
    <Toolbar disableGutters variant="dense" style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Title {..._source} />

      {/* DATABOOK */}
      <Hidden smDown>
        {showDatabook && (
          <Suspense fallback={<LoadingCircular />}>
            <CreateDatabookButton {..._source} />
          </Suspense>
        )}
      </Hidden>

      {/* ATLAS PREVIEW */}
      {showPreview && <PreviewAtlasButton {..._source} />}

      {/* CITATION */}
      <CitationButton style={!showSelect && !showDownload ? { marginRight: 8 } : {}} {..._source} />

      {/* DOWNLOAD */}
      <Hidden smDown>
        {showDownload && (
          <Suspense fallback={<LoadingCircular />}>
            <DataDownloadButton
              buttonProps={{ style: showSelect ? {} : { marginRight: 8 } }}
              size={16}
              {..._source}
            />
          </Suspense>
        )}
      </Hidden>

      {/* SELECT */}
      {showSelect && (
        <>
          <Divider orientation="vertical" style={{ height: 16, margin: 16 }} />
          <ToggleItemButton {..._source} />
        </>
      )}
    </Toolbar>
  )
}
