import DownloadRecords from './download-records-button'
import CreateAtlasButton from './create-atlas-button'
import CreateDatabookButton from './create-databook-button'
import { databookCache, atlasCache } from './_cache'

export default ({ catalogue }) => {
  return (
    <>
      <CreateDatabookButton cache={databookCache} catalogue={catalogue} />
      <DownloadRecords catalogue={catalogue} />
      <CreateAtlasButton cache={atlasCache} catalogue={catalogue} />
    </>
  )
}
