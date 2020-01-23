import { Tile as TileLayer } from 'ol/layer.js'
import { TileWMS } from 'ol/source'

export const newLayer = ({ id, title, url, name }) => {
  console.log(url)
  return new TileLayer({
    id,
    title: title || id,
    visible: true,
    source: new TileWMS({
      url,
      params: {
        LAYERS: name,
        TILED: true,
        FORMAT: 'image/png'
      },
      serverType: 'geoserver',
      transition: 500
    }),
    opacity: 0.7
  })
}
