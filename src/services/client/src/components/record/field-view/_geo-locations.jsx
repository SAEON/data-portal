import React from 'react'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import { terrestrisBaseMap } from '../../../lib/ol'
import { OlReact } from '@saeon/ol-react'
import WKT from 'ol/format/WKT'
import Row from '../_row'

const wkt = new WKT()

export default ({ geoLocations }) => (
  <Row title={'Spatial covereage'}>
    <OlReact
      viewOptions={{
        smoothExtentConstraint: true,
        showFullExtent: true,
        extent: new Polygon(wkt.readGeometry(geoLocations[0].geoLocationBox).getCoordinates())
          .getExtent()
          .map((v, i) => ((i === 0) | (i === 1) ? v - 1 : v + 1)), // subtract for minX/minY, expand for maxX, maxY
      }}
      layers={[
        new VectorLayer({
          id: 'extent-layer',
          title: 'Extent',
          source: new VectorSource({
            wrapX: false,
            features: geoLocations.map(
              ({ geoLocationBox }) =>
                new Feature({
                  geometry: new Polygon(wkt.readGeometry(geoLocationBox).getCoordinates()),
                })
            ),
          }),
        }),
        terrestrisBaseMap(),
      ]}
      style={{ height: '350px', position: 'relative' }}
    />
  </Row>
)
