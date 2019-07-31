import './index.scss'
import React from 'react'
import { render } from "react-dom"
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import { Group } from 'ol/layer'
import OSM from 'ol/source/OSM'
import TileWMS from 'ol/source/TileWMS'
import { defaults as olControls } from 'ol/control.js'
import { fromLonLat } from 'ol/proj.js'
import { default as LayerSwitcher } from 'ol-layerswitcher'
import { Tile, BingMaps } from 'ol/source';



class SaeonMap extends React.Component {
  constructor(props) {
    super(props)
    this.map = null
    this.mapRef = React.createRef()
  }
  componentDidMount() {
    const layers = [
      new Group({
        title: 'Base map',
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
          })
        ]
      }),
      new Group({
        title: 'Overlays',
        layers: [
          new TileLayer({
            title: "DEA_CARBON",
            visible: false,
            source: new TileWMS({
              url: 'http://app01.saeon.ac.za:8084/geoserver/DEA_CARBON_II/wms',
              params: {
                'LAYERS': 'DEA_CARBON_II:Tmax A2 Change between 2000 and 2050 90th Percentile',
                'TILED': true,
                'FORMAT': 'image/png'
              },
              serverType: 'geoserver',
              transition: 0
            }),
            opacity: 0.7
          }),          
          new TileLayer({
            title: 'SUGAR',
            visible: true,
            source: new TileWMS({
              url: 'http://app01.saeon.ac.za:8086/geoserver/BEA/wms',
              params: {
                'LAYERS': '=BEA:1_03_SUG',
                'STYLE': '1_03_SUG_SUGAR',
                'TILED': true,
                'FORMAT': 'image/png'
              },
              serverType: 'geoserver',
              transition: 0
            }),
            opacity: 0.7
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
        center:  fromLonLat([21, -20]),
        zoom: 4
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

render(<SaeonMap />, document.getElementById('root'))