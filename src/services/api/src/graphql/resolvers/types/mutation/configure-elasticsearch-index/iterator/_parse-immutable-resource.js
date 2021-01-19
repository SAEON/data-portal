const chooseFileFormat = (archivedFormats = []) => {
  /**
   * Check for shapefile
   */
  if (archivedFormats.includes('shp')) {
    return 'shapefile'
  }

  /**
   * Unknown archive contents
   */
  return 'unknown'
}

export default (id, values) => {
  const { fileFormat = undefined, archive = false, archivedFormats = undefined } =
    values.resourceDownload || {}

  return {
    _archive: archive || (fileFormat ? false : 'unknown'),
    _fileFormat: fileFormat || chooseFileFormat(archivedFormats),
    ...values,
  }
}
