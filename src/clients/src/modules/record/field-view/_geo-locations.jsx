import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import { terrestrisBaseMap } from '../../../lib/ol'
import { OlReact } from '../../../packages/ol-react'
import WKT from 'ol/format/WKT'
import Row from '../_row'

const wkt = new WKT()

const EXTENT_PADDING = 2

export default ({ geoLocations }) => {
  return (
    <Row title={'Spatial coverage'}>
      <OlReact
        viewOptions={{
          smoothExtentConstraint: true,
          showFullExtent: true,
          extent: geoLocations[0].geoLocationBox
            ? new Polygon(wkt.readGeometry(geoLocations[0].geoLocationBox).getCoordinates())
                .getExtent()
                .map((v, i) => ((i === 0) | (i === 1) ? v - EXTENT_PADDING : v + EXTENT_PADDING))
            : geoLocations[0].geoLocationPoint
            ? new Point(wkt.readGeometry(geoLocations[0].geoLocationPoint).getCoordinates())
                .getExtent()
                .map((v, i) => ((i === 0) | (i === 1) ? v - EXTENT_PADDING : v + EXTENT_PADDING))
            : undefined
        }}
        layers={[
          new VectorLayer({
            id: 'extent-layer',
            title: 'Extent',
            source: new VectorSource({
              wrapX: false,
              features: geoLocations.map(({ geoLocationBox, geoLocationPoint }) =>
                geoLocationBox
                  ? new Feature({
                      geometry: new Polygon(wkt.readGeometry(geoLocationBox).getCoordinates())
                    })
                  : geoLocationPoint
                  ? new Feature({
                      geometry: new Point(wkt.readGeometry(geoLocationPoint).getCoordinates())
                    })
                  : []
              )
            })
          }),
          terrestrisBaseMap()
        ]}
        style={{ height: '350px', position: 'relative' }}
      />
    </Row>
  )
}
