import { parse } from 'wkt'

export default wkt_4326 => ({
  geo_shape: {
    'geoLocations.geoLocationBox.geometry': {
      shape: parse(wkt_4326),
      relation: 'within',
    },
  },
})
