import { Tile as TileLayer } from 'ol/layer.js'
import { TileArcGISRest } from 'ol/source'

export const esriLayer = ({ uri, title }) =>
  new TileLayer({
    title,
    id: title,
    visible: true,
    source: new TileArcGISRest({
      url: uri
    })
  })
