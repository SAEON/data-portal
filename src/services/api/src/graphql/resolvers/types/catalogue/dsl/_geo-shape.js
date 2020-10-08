import wkt from 'wkt'
const { parse } = wkt

export default wkt_4326 => ({
  geo_shape: {
    'geoLocations.geoLocationBox.geo_shape': {
      shape: parse(wkt_4326),
      relation: 'within',
    },
  },
})
