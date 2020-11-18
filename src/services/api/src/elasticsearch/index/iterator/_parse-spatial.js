import { stringify as createWkt_4326 } from 'wkt'

export default spatial =>
  spatial.map(({ geoLocationBox, geoLocationPoint }) => ({
    geoLocationBox: geoLocationBox
      ? createWkt_4326({
          type: 'Polygon',
          coordinates: [
            [
              [geoLocationBox.westBoundLongitude, geoLocationBox.northBoundLatitude],
              [geoLocationBox.eastBoundLongitude, geoLocationBox.northBoundLatitude],
              [geoLocationBox.eastBoundLongitude, geoLocationBox.southBoundLatitude],
              [geoLocationBox.westBoundLongitude, geoLocationBox.southBoundLatitude],
              [geoLocationBox.westBoundLongitude, geoLocationBox.northBoundLatitude],
            ],
          ],
        })
      : undefined,
    geoLocationPoint: geoLocationPoint
      ? createWkt_4326({
          type: 'Point',
          coordinates: [geoLocationPoint.pointLongitude, geoLocationPoint.pointLatitude],
        })
      : undefined,
  }))
