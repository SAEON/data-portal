import { stringify as createWkt_4326 } from 'wkt'

/**
 * Polygons are counterclockwise. This is specifically
 * defined in the mapping, so NON-counterclockwise polygons
 * won't work
 */
export default (id, spatial) => {
  try {
    return spatial.map(({ geoLocationBox, geoLocationPoint }) => {
      const shp = {
        geoLocationBox: undefined,
        geoLocationPoint: undefined,
      }

      if (geoLocationBox) {
        const { westBoundLongitude, northBoundLatitude, eastBoundLongitude, southBoundLatitude } =
          geoLocationBox

        // Sometimes points are defined in the box field
        if (
          westBoundLongitude === eastBoundLongitude &&
          northBoundLatitude === southBoundLatitude
        ) {
          console.warn(
            id,
            'WARNING. Point defined as box (this could be an error in the metadata)',
            JSON.stringify(geoLocationBox)
          )

          if (geoLocationPoint) {
            throw new Error('Cannot overwrite existing point field')
          }

          shp.geoLocationPoint = createWkt_4326({
            type: 'Point',
            coordinates: [westBoundLongitude, northBoundLatitude],
          })
        } else {
          shp.geoLocationBox = createWkt_4326({
            type: 'Polygon',
            coordinates: [
              [
                [westBoundLongitude, northBoundLatitude],
                [westBoundLongitude, southBoundLatitude],
                [eastBoundLongitude, southBoundLatitude],
                [eastBoundLongitude, northBoundLatitude],
                [westBoundLongitude, northBoundLatitude],
              ],
            ],
          })
        }
      }

      if (geoLocationPoint) {
        const { pointLatitude, pointLongitude } = geoLocationPoint
        shp.geoLocationPoint = createWkt_4326({
          type: 'Point',
          coordinates: [pointLongitude, pointLatitude],
        })
      }

      return shp
    })
  } catch (error) {
    throw new Error(`Unable to parse spatial information: ${error.message}`)
  }
}
