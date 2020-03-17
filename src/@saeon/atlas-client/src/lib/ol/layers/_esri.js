import { Tile as TileLayer } from 'ol/layer.js'
import { TileArcGISRest } from 'ol/source'

export const esriLayer = ({ id, uri, title }) =>
  new TileLayer({
    title,
    uri,
    id: id || uri,
    visible: true,
    source: new TileArcGISRest({
      url: uri
    })
  })
