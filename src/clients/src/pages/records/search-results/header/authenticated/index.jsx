import { useMemo } from 'react'
import DownloadRecords from './download-records-button'
import CreateAtlasButton from './create-atlas-button'

const cache = {
  atlases: {},
}

export default ({ catalogue }) => {
  /**
   * This caching makes it easier to check
   * if a record is valid for an Atlas
   */
  useMemo(() => {
    for (let node of catalogue?.records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { linkedResources, id: itemId } = _source

      // Register to atlas cache
      cache.atlases[itemId] = Boolean(
        linkedResources?.find(
          ({ linkedResourceType }) => linkedResourceType?.toUpperCase() === 'QUERY'
        )
      )
    }
  }, [catalogue])

  return (
    <>
      <CreateAtlasButton cache={cache.atlases} catalogue={catalogue} />
      <DownloadRecords catalogue={catalogue} />
    </>
  )
}
