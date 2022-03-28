import { parse } from 'wkt'

export default wkt_4326 => ({
  geo_shape: {
    'geoLocations.geoLocationBox': {
      shape: parse(wkt_4326),
      relation: 'within'
    }
  }
})
