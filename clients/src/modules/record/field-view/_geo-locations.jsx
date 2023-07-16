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
import { Fill, Stroke, Circle, Style } from 'ol/style'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import LayerGroup from 'ol/layer/Group'
import { useTheme, alpha } from '@mui/material/styles'
import { getArea } from 'ol/sphere'

const wkt = new WKT()

const EXTENT_PADDING = 4

export default ({ geoLocations }) => {
  const ref = useRef()
  const theme = useTheme()

  const map = useMemo(
    () =>
      new Map({
        layers: new LayerGroup({
          layers: [
            esriBasemap(),
            new VectorLayer({
              id: 'extent-layer',
              title: 'Extent',
              style: function (feature, resolution) {
                const geometryType = feature.getGeometry().getType()
                if (geometryType === 'Point') {
                  return new Style({
                    image: new Circle({
                      radius: 10,
                      fill: new Fill({
                        color: alpha(theme.palette.primary.main, 0.5),
                      }),
                      stroke: new Stroke({
                        color: alpha(theme.palette.primary.main, 1),
                        width: 1,
                      }),
                    }),
                  })
                } else if (geometryType === 'Polygon') {
                  return new Style({
                    fill: new Fill({
                      color: alpha(theme.palette.primary.main, 0.5),
                    }),
                    stroke: new Stroke({
                      color: alpha(theme.palette.primary.main, 1),
                      width: 1,
                    }),
                  })
                }
              },
              source: new VectorSource({
                wrapX: false,
                features: geoLocations.map(({ geoLocationBox, geoLocationPoint }) => {
                  if (geoLocationBox) {
                    const polygon = new Polygon(wkt.readGeometry(geoLocationBox).getCoordinates())
                    const area = getArea(polygon, { projection: 'EPSG:4326' }) // returns meters
                    const threshold = 100000000 // 100 square km
                    if (area < threshold) {
                      return new Feature({
                        geometry: new Point(polygon.getInteriorPoint().getCoordinates()),
                      })
                    } else {
                      return new Feature({
                        geometry: polygon,
                      })
                    }
                  } else if (geoLocationPoint) {
                    return new Feature({
                      geometry: new Point(wkt.readGeometry(geoLocationPoint).getCoordinates()),
                    })
                  } else {
                    return []
                  }
                }),
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
    [geoLocations],
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
        mx: theme => theme.spacing(0.5),
        mt: theme => theme.spacing(2),
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
