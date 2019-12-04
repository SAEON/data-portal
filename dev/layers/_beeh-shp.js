import { Tile as TileLayer } from 'ol/layer.js'
import { TileWMS } from 'ol/source'

export const beehStormflowCount = () =>
  new TileLayer({
    id: 'stormflowCountofDays',
    title: 'Stormflow (count of days)',
    visible: true,
    source: new TileWMS({
      url: 'http://app01.saeon.ac.za:8082/geoserver/BEEH_shp/wms',
      params: {
        LAYERS: 'BEEH_shp:quickfgt2mm.shp',
        TILED: true,
        FORMAT: 'image/png'
      },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    }),
    opacity: 0.7
  })

export const beehStormflow = () =>
  new TileLayer({
    id: 'stormflow',
    title: 'Stormflow',
    visible: true,
    source: new TileWMS({
      url: 'http://app01.saeon.ac.za:8082/geoserver/BEEH_shp/wms',
      params: {
        LAYERS: 'BEEH_shp:hist_quickf.shp',
        TILED: true,
        FORMAT: 'image/png'
      },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    }),
    opacity: 0.7
  })
