import { useMemo } from 'react'
import DownloadRecords from './download-records-button'
import CreateAtlasButton from './create-atlas-button'
import CreateDatabookButton from './create-databook-button'
import { CATALOGUE_SUPPORTED_DATABOOK_FORMATS } from '../../../../../config'

export default ({ catalogue }) => {
  const cache = useMemo(() => {
    const cache = {
      atlases: {},
      databooks: {},
    }

    for (let node of catalogue?.records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { immutableResource, id: itemId } = _source

      // Register databooks cache
      cache.databooks[itemId] = CATALOGUE_SUPPORTED_DATABOOK_FORMATS.includes(
        immutableResource?._fileFormat
      )
    }

    return cache
  }, [catalogue])

  return (
    <>
      <CreateDatabookButton cache={cache} catalogue={catalogue} />
      <CreateAtlasButton catalogue={catalogue} />
      <DownloadRecords catalogue={catalogue} />
    </>
  )
}
