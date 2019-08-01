import React from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import { Group } from 'ol/layer'
import Point from 'ol/geom/Point.js'
import { defaults as olControls } from 'ol/control.js'
import { fromLonLat } from 'ol/proj.js'
import { default as LayerSwitcher } from 'ol-layerswitcher'
import Feature from 'ol/Feature.js'
import { Tile, BingMaps, OSM, TileWMS, Cluster, Vector as VectorSource } from 'ol/source'
import {Circle as CircleStyle, Fill, Stroke, Style, Text} from 'ol/style.js'

// TEMP to remove once CORS is enabled
import dotJson from './temp-dots.json'

var styleCache = {}
const getStyle = feature => {
  var size = feature.get('features').length
  var style = styleCache[size] || new Style({
    image: new CircleStyle({
      radius: 10,
      stroke: new Stroke({
        color: '#fff'
      }),
      fill: new Fill({
        color: '#3399CC'
      })
    }),
    text: new Text({
      text: size.toString(),
      fill: new Fill({
        color: '#fff'
      })
    })
  })
  styleCache[size] = style
  return style
}

export default class SaeonMap extends React.Component {
  constructor(props) {
    super(props)
    this.map = null
    this.mapRef = React.createRef()
  }

  async componentDidMount() {
    // let dots = null
    // try {
      // dots = await new Promise((resolve, reject) => {
      //   fetch('http://app01.saeon.ac.za/nccrdapi/odata/Projects/GeoJson')
      //     .then(result => result.text())
      //     .then(text => resolve(text))
      //     .catch(err => reject(err))
      // })
    // } catch (error) {
    //   dots = 'error'
    // }

    // var count = 20000;
    // var features = new Array(count);
    // var e = 4500000;
    // for (var i = 0; i < count; ++i) {
    //   var coordinates = [2 * e * Math.random() - e, 2 * e * Math.random() - e];
    //   features[i] = new Feature(new Point(coordinates));
    // }

 
    const features = []
    dotJson.forEach(f => {
      const coordinates = f.geometry.coordinates
      features.push(new Feature(new Point(fromLonLat(coordinates))))
    })

    console.log(features)
    

    const layers = [
      new Group({
        title: 'BASES',
        layers: [
          new TileLayer({
            title: 'Bing Maps',
            source: new BingMaps({
              key: 'AlCkK5mZ8gsny94jfbHxvol7MdIlnS5NsobVUzXd2RHlnHUVtGDjL6Vjtk7Xycgv',
              imagerySet: 'Aerial'
            })
          }),          
          new TileLayer({
            title: 'OpenStreetMaps',
            source: new OSM({})
          }),
          new TileLayer({
            title: 'CDNGI-Aerial',
            visible: false,
            source: new TileWMS({
              url: 'http://aerial.openstreetmap.org.za/maps?map=/store/cd-ngi/cdngi-aerial.map&amp;',
              params: {
                'LAYERS': 'CDNGI-Aerial',
                'TILED': true,
                'FORMAT': 'image/png'
              },
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0
            }),
            opacity: 1
          }),          
        ]
      }),
      new Group({
        title: 'OVERLAYS',
        layers: [     
          new TileLayer({
            title: 'Stormflow',
            visible: false,
            source: new TileWMS({
              url: 'http://app01.saeon.ac.za:8082/geoserver/BEEH_shp/wms',
              params: {
                'LAYERS': 'BEEH_shp:hist_quickf.shp',
                'TILED': true,
                'FORMAT': 'image/png'
              },
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0
            }),
            opacity: 0.7
          }),
          new TileLayer({
            title: 'Stormflow (count of days)',
            visible: false,
            source: new TileWMS({
              url: 'http://app01.saeon.ac.za:8082/geoserver/BEEH_shp/wms',
              params: {
                'LAYERS': 'BEEH_shp:quickfgt2mm.shp',
                'TILED': true,
                'FORMAT': 'image/png'
              },
              serverType: 'geoserver',
              // Countries have transparency, so do not fade tiles:
              transition: 0
            }),
            opacity: 0.7
          }),
          new VectorLayer({
            title: 'Dots',
            source: new Cluster({
              distance: 50,
              source: new VectorSource({
                features: features
              })
            }),
            style: feature => getStyle(feature)
          })          
        ]
      })
    ]

    this.map = new Map({
      target: this.mapRef.current,
      layers,
      controls: olControls({
        zoom: false,
        rotateOptions: false,
        rotate: false,
        attribution: false
      }),
      view: new View({
        center:  fromLonLat([23, -29.2]),
        zoom: 5.6
      })
    })

    const layerSwitcher = new LayerSwitcher({
      tipLabel: 'Layers', // Optional label for button
      groupSelectStyle: 'none' // Can be 'children' [default], 'group' or 'none'
    })

    this.map.addControl( layerSwitcher)
  }
  render() {
    return (
      <div style={{ width: '100%', height: '100%' }} ref={this.mapRef} />
    )
  }
}