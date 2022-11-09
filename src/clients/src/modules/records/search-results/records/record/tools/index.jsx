import { lazy, Suspense } from 'react'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import DOI from '../_doi'
import PreviewAtlasButton from '../../../../../../components/preview-atlas-button'
import CitationButton from '../../../../../../components/citation-dialogue'
import LoadingCircular from '../../../../../../components/loading-circular'
import ToggleItemButton from './_toggle-item-button'
import Hidden from '@mui/material/Hidden'

const DataDownloadButton = lazy(() => import('../../../../../../components/data-download'))

export default ({ showDownload = false, showPreview = true, showSelect = true, ..._source }) => {
  return (
    <Toolbar disableGutters variant="dense" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      <DOI sx={{ mr: 'auto', ml: theme => theme.spacing(2) }} {..._source} />

      {/* ATLAS PREVIEW */}
      {showPreview && <PreviewAtlasButton {..._source} />}

      {/* CITATION */}
      <CitationButton
        sx={!showSelect && !showDownload ? { mr: theme => theme.spacing(2) } : {}}
        {..._source}
      />

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
          <Divider
            orientation="vertical"
            sx={{ height: theme => theme.spacing(4), m: theme => theme.spacing(4) }}
          />
          <ToggleItemButton {..._source} />
        </>
      )}
    </Toolbar>
  )
}
