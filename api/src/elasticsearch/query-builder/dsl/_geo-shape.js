import { parse } from 'wkt'

export default wkt_4326 => ({
  bool: {
    should: [
      {
        geo_shape: {
          'geoLocations.geoLocationBox': {
            shape: parse(wkt_4326),
            relation: 'within',
          },
        },
      },
      {
        geo_shape: {
          'geoLocations.geoLocationPoint': {
            shape: parse(wkt_4326),
            relation: 'within',
          },
        },
      },
    ],
    minimum_should_match: 1,
  },
})
