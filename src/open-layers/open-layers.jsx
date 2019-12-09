import React, { Component } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import { defaults as defaultControls } from 'ol/control.js'

export default class extends Component {

  state = {
    clientWidth: 0
  }

  constructor(props) {
    super(props)

    // DOM reference used by THIS component
    this.mapRef = React.createRef()

    // Create a map reference
    this.map = new Map({
      layers: [...this.props.layers],
      controls: defaultControls({
        zoom: false,
        rotateOptions: false,
        rotate: false,
        attribution: false
      }).extend([]),
      view: new View(
        Object.assign(this.props.viewOptions || {}, {
          center: [0, 0],
          zoom: 2.5,
          projection: 'EPSG:4326'
        })
      )
    })
  }

  componentDidMount() {
    this.map.setTarget(this.mapRef.current) 
  }

  componentDidUpdate() {
    setTimeout(() => {
      const clientWidth = this.mapRef.current.clientWidth
      if (clientWidth > this.state.clientWidth) {
        this.setState({clientWidth}, () => this.map.updateSize())
      }
    }, 300)
  }

  componentWillUnmount() {
    this.map.dispose()
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
