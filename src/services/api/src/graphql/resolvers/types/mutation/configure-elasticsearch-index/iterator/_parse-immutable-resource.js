const chooseFileFormat = format => {
  /**
   * format is an Array type
   * i.e. archive == true
   */
  if (typeof format === 'object') {
    if (format.includes('shp')) {
      return 'Shapefile'
    }

    if (format.includes('nc')) {
      return 'NetCDF'
    }

    return format.join('|')
  }

  /**
   * Format is a string type
   * i.e. archive == false
   */
  if (typeof format === 'string') {
    if (format === 'nc') {
      return 'NetCDF'
    }

    return format
  }

  return 'Unknown'
}

export default (id, values) => {
  const { fileFormat = undefined, archive = false, archivedFormats = undefined } =
    values.resourceDownload || {}

  return {
    _archive: archive || (fileFormat ? false : 'Unknown'),
    _fileFormat: chooseFileFormat(fileFormat || archivedFormats),
    ...values,
  }
}
