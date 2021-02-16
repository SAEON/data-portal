import Polygon from 'ol/geom/Polygon'
import Point from 'ol/geom/Point'
import WKT from 'ol/format/WKT'
import { parse } from 'url'
import { OlReact } from '@saeon/ol-react'
import { terrestrisBaseMap, createLayer, LayerTypes } from '../../lib/ol/layers'
import { CATALOGUE_API_ADDRESS } from '../../config'

const wkt = new WKT()

const SPATIALDATA_PROXY = `${CATALOGUE_API_ADDRESS}/proxy/saeon-spatialdata`

const EXTENT_PADDING = 3

export default ({ geoLocations, resourceURL, id, title }) => {
  const { pathname, hostname, port, query } = parse(resourceURL, true)
  const { layers: LAYERS } = query
  const layerId = `${id} - ${LAYERS}`
  const uri = `${SPATIALDATA_PROXY}/${hostname}/${port}${pathname}`

  return (
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
          : undefined,
      }}
      layers={[
        createLayer({ id: layerId, layerType: LayerTypes.TileWMS, title, uri, LAYERS }),
        terrestrisBaseMap(),
      ]}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
