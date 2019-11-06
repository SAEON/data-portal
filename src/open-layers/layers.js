import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer.js'
import { OSM, TileWMS } from 'ol/source'
import { clusterStyle } from './styles'

export const ahocevarBaseMap = () =>
  new TileLayer({
    title: 'Ahocevar Base Map',
    id: 'ahocevarBaseMap',
    visible: true,
    source: new TileWMS({
      url: 'https://ahocevar.com/geoserver/wms',
      params: {
        LAYERS: 'ne:NE1_HR_LC_SR_W_DR',
        TILED: true
      }
    })
  })

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

export const cdngiAerial = () =>
  new TileLayer({
    id: 'cdngiAerial',
    title: 'CDNGI-Aerial',
    visible: true,
    source: new TileWMS({
      url: 'http://aerial.openstreetmap.org.za/maps?map=/store/cd-ngi/cdngi-aerial.map&amp;',
      params: {
        LAYERS: 'CDNGI-Aerial',
        TILED: true,
        FORMAT: 'image/png'
      },
      serverType: 'geoserver',
      // Countries have transparency, so do not fade tiles:
      transition: 0
    }),
    opacity: 1
  })

export const openStreetLayers = () =>
  new TileLayer({
    id: 'openStreetMap',
    title: 'Open Street Maps',
    visible: true,
    id: 'openStreetLayers',
    source: new OSM({})
  })

export const clusterLayer = (source, id = 'cluster-layer') =>
  new VectorLayer({
    title: id,
    visible: true,
    id,
    source,
    style: clusterStyle
  })
