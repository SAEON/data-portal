import { lazy, Suspense } from 'react'
import PreviewAtlasButton from '../../../../../../components/preview-atlas-button'
import CitationButton from '../../../../../../components/citation-dialogue'
import LoadingCircular from '../../../../../../components/loading-circular'
import ToggleItemButton from './_toggle-item-button'
import Hidden from '@mui/material/Hidden'

const DataDownloadButton = lazy(() => import('../../../../../../components/data-download'))

export default ({ ..._source }) => {
  return (
    <>
      <ToggleItemButton {..._source} />
      <PreviewAtlasButton {..._source} />
      <CitationButton doi={_source.doi} />
      <Hidden smDown>
        <Suspense fallback={<LoadingCircular />}>
          <DataDownloadButton title="Download data" buttonProps={{ style: {} }} {..._source} />
        </Suspense>
      </Hidden>
    </>
  )
}
