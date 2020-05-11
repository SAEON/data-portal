import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control'
import LayerGroup from 'ol/layer/Group'

export default class extends Component {
  constructor(props) {
    super(props)

    // DOM reference used by THIS component
    this.mapRef = React.createRef()

    // Create a map reference
    this.map = new Map({
      layers: new LayerGroup({
        layers: [...this.props.layers].map((layer, i, arr) => {
          layer.setZIndex(arr.length - i)
          return layer
        }),
      }),
      controls: defaultControls({
        zoom: false,
        rotateOptions: false,
        rotate: false,
        attribution: false,
      }).extend([]),
      view: new View(
        Object.assign(
          {
            center: [0, 0],
            zoom: 3,
            projection: 'EPSG:4326',
          },
          this.props.viewOptions || {}
        )
      ),
    })
  }

  componentDidMount() {
    this.map.setTarget(this.mapRef.current)
  }

  componentWillUnmount() {
    this.map.setTarget(null)
  }

  componentDidUpdate() {
    this.map.updateSize()
  }

  render() {
    const { children, style, className } = this.props
    const { map, mapRef } = this
    return (
      <div className={className} style={style}>
        {children ? children({ map }) : null}
        <div className="ol" ref={mapRef} style={{ width: '100%', height: '100%' }} />
      </div>
    )
  }
}
