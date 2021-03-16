/**
 * @param {String|Array} format Dataset format
 */
const chooseFileFormat = format => {
  // No format - Unknown
  if (!format) {
    return 'UNKNOWN'
  }

  /**
   * Arrays suggest an archive. But that is irrelevant in this function
   * Normalize to an array
   */
  format = (typeof format === 'string' ? [format] : format).map(f => f.toUpperCase())

  if (format.includes('SHP')) {
    return 'SHAPEFILE'
  }

  if (format.includes('NC')) {
    return 'NETCDF'
  }

  if (format.includes('ASC')) {
    return 'ASC'
  }

  if (format.includes('TIF')) {
    if (format.includes('PDF')) {
      return 'PDF|TIFF'
    }
    if (format.includes('DBF')) {
      return 'DBF|TIFF'
    }
    return 'TIFF'
  }

  if (format.includes('IMG')) {
    if (format.includes('PDF')) {
      return 'PDF|IMG'
    }
  }

  if (format.includes('PDF')) {
    return 'PDF'
  }

  if (format.includes('JPEG')) {
    return 'JPEG'
  }

  if (format.includes('HDR')) {
    if (format.includes('DAT')) {
      return 'DAT|HDR'
    }
    return 'HDR'
  }

  if (format.includes('CSV')) {
    return 'CSV'
  }

  if (format.includes('TXT')) {
    return 'TEXT'
  }

  return format.join('|')
}

export default (id, values) => {
  const { fileFormat = undefined, archive = false, archivedFormats = undefined } =
    values.resourceDownload || {}

  return {
    _archive: archive || false,
    _fileFormat: chooseFileFormat(fileFormat || archivedFormats),
    ...values,
  }
}
