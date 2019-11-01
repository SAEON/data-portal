import { Cluster, Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

/**
 * Data is an array of objects
 * Each object MUST contain a field 'xyz'
 * This field must contain a GeoJson string, with type=Point
 * @param {Array} data Array<Object>
 */
export const clusterSource = data =>
  new Cluster({
    distance: 100,
    source: new VectorSource({
      features: data.map(datum => {
        const xyz = JSON.parse(datum.xyz).coordinates
        return new Feature({ ...datum, geometry: new Point([xyz[0], xyz[1]]) })
      })
    })
  })
