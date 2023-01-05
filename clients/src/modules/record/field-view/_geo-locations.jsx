import { useEffect, useRef, useMemo } from 'react'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Polygon from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import { esriBasemap } from '../../../lib/ol'
import WKT from 'ol/format/WKT'
import Row from '../_row'
import MapAttribution from '../../../components/map-attribution'
import { Div } from '../../../components/html-tags'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import LayerGroup from 'ol/layer/Group'

const wkt = new WKT()

const EXTENT_PADDING = 4

export default ({ geoLocations }) => {
  const ref = useRef()

  const map = useMemo(
    () =>
      new Map({
        layers: new LayerGroup({
          layers: [
            esriBasemap(),
            new VectorLayer({
              id: 'extent-layer',
              title: 'Extent',
              source: new VectorSource({
                wrapX: false,
                features: geoLocations.map(({ geoLocationBox, geoLocationPoint }) =>
                  geoLocationBox
                    ? new Feature({
                        geometry: new Polygon(wkt.readGeometry(geoLocationBox).getCoordinates()),
                      })
                    : geoLocationPoint
                    ? new Feature({
                        geometry: new Point(wkt.readGeometry(geoLocationPoint).getCoordinates()),
                      })
                    : []
                ),
              }),
            }),
          ],
        }),
        controls: defaultControls({
          zoom: false,
          rotateOptions: false,
          rotate: false,
          attribution: false,
        }),
        view: new View({
          center: [0, 0],
          zoom: 3,
          projection: 'EPSG:4326',
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
            : undefined,
        }),
      }),
    [geoLocations]
  )

  useEffect(() => {
    map.setTarget(ref.current)
  }, [map])

  return (
    <Row
      cardContentSx={{ p: `0px !important` }}
      titleSx={{
        position: 'absolute',
        zIndex: 1,
        px: theme => theme.spacing(2),
        m: theme => theme.spacing(0.5),
        boxShadow: theme => theme.shadows[1],
        backgroundColor: theme => theme.palette.common.white,
      }}
      title={'Spatial coverage'}
    >
      <Div sx={{ position: 'relative', height: 350 }}>
        <Div
          ref={ref}
          sx={{
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
        />
        <MapAttribution />
      </Div>
    </Row>
  )
}
