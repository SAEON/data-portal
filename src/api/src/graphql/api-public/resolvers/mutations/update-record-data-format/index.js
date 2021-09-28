import fetch from 'node-fetch'
import processApplicationZip from './_application-zip.js'
import normalizeDownloadUrl from '../../../../../lib/normalize-data-download-uri.js'

export default async (self, { id, immutableResource }) => {
  console.info('Updating data format for indexed record', id)

  const downloadURL = immutableResource?.resourceDownload.downloadURL
  if (!downloadURL) {
    return null
  }

  const blobUri = await normalizeDownloadUrl(downloadURL)

  if (!blobUri) {
    throw new Error(
      `Immutable resource for record ${id} does not seem to have a valid download URL`
    )
  }

  const downloadFormat = await fetch(blobUri, { method: 'HEAD' }).then(res =>
    res.headers.get('Content-Type')
  )

  if (downloadFormat.toLowerCase() === 'application/zip') {
    processApplicationZip(id, blobUri)
  }

  /**
   * For now, just return null
   * from this method
   */
  return null
}
