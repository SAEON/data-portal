import { lazy, Suspense } from 'react'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import clsx from 'clsx'
import useStyles from './style'
import Title from './_title'
import PreviewAtlasButton from '../../../../../../components/preview-atlas-button'
import CitationButton from '../../../../../../components/citation-dialogue'
import LoadingCircular from '../../../../../../components/loading-circular'
import ToggleItemButton from './_toggle-item-button'
import { isMobile } from 'react-device-detect'

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
  const classes = useStyles()

  return (
    <Toolbar
      className={clsx(classes.toolbar)}
      disableGutters
      variant="dense"
      style={{ display: 'flex', justifyContent: 'flex-end' }}
    >
      <Title {..._source} />

      {/* DATABOOK */}
      {showDatabook && !isMobile && (
        <Suspense fallback={<LoadingCircular />}>
          <CreateDatabookButton {..._source} />
        </Suspense>
      )}

      {/* ATLAS PREVIEW */}
      {showPreview && <PreviewAtlasButton {..._source} />}

      {/* CITATION */}
      <CitationButton style={!showSelect && !showDownload ? { marginRight: 8 } : {}} {..._source} />

      {/* DOWNLOAD */}
      {showDownload && !isMobile && (
        <Suspense fallback={<LoadingCircular />}>
          <DataDownloadButton
            style={showSelect ? {} : { marginRight: 8 }}
            size={'small'}
            immutableResource={_source?.immutableResource}
          />
        </Suspense>
      )}

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
