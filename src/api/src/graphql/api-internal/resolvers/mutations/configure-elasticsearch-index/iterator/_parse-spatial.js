import { stringify as createWkt_4326 } from 'wkt'
import { GIS_MAX_RESOLUTION_DECIMALS as GIS_DECIMALS } from '../../../../../../config/index.js'

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

        /**
         * Sometimes points are defined in the box field
         * These need to be converted to points. To check
         * for this, points are rounded to 5 decimal points
         */
        if (
          westBoundLongitude.toFixed(GIS_DECIMALS) === eastBoundLongitude.toFixed(GIS_DECIMALS) &&
          northBoundLatitude.toFixed(GIS_DECIMALS) === southBoundLatitude.toFixed(GIS_DECIMALS)
        ) {
          console.warn(
            id,
            'WARNING. Point defined as box (this could be an error in the metadata)',
            JSON.stringify(geoLocationBox)
          )

          /**
           * Just make sure the curators haven't defined
           * a tiny box AND a point
           */
          if (geoLocationPoint) {
            throw new Error('Cannot overwrite existing point field')
          }

          shp.geoLocationPoint = createWkt_4326({
            type: 'Point',
            coordinates: [
              westBoundLongitude.toFixed(GIS_DECIMALS),
              northBoundLatitude.toFixed(GIS_DECIMALS),
            ],
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
