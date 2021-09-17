import { useMemo } from 'react'
import DownloadRecords from './download-records-button'
import CreateAtlasButton from './create-atlas-button'
import CreateDatabookButton from './create-databook-button'
import { CATALOGUE_SUPPORTED_DATABOOK_FORMATS } from '../../../../../config'

const cache = {
  atlases: {},
  databooks: {},
}

export default ({ catalogue }) => {
  /**
   * This caching makes it easier to check
   * if a record is valid for an Atlas and/
   * or a Databook
   */
  useMemo(() => {
    for (let node of catalogue?.records.nodes) {
      var { metadata } = node
      var { _source } = metadata
      var { immutableResource, linkedResources, id: itemId } = _source

      // Register to databooks cache
      cache.databooks[itemId] = CATALOGUE_SUPPORTED_DATABOOK_FORMATS.includes(
        immutableResource?._fileFormat
      )

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
      <CreateDatabookButton cache={cache.databooks} catalogue={catalogue} />
      <CreateAtlasButton cache={cache.atlases} catalogue={catalogue} />
      <DownloadRecords catalogue={catalogue} />
    </>
  )
}
