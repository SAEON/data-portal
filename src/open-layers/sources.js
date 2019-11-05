import { Cluster, Vector as VectorSource } from 'ol/source'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'

/**
 * {
 *  data // [ {}, {}, {}]
 *  locAttribute // The name of the field that contains a GeoJson coordinate
 *  Distance to cluster on (default 100)
 * }
 */
export const clusterSource = ({ data, locAttribute, distance }) =>
  new Cluster({
    distance: distance ? distance : 100,
    source: new VectorSource({
      features: data.map(datum => {
        const xyz = JSON.parse(datum[locAttribute]).coordinates
        return new Feature({ ...datum, geometry: new Point([xyz[0], xyz[1]]) })
      })
    })
  })
