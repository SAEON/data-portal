import React, { PureComponent } from 'react'
import { Map, ahocevarBaseMap } from '../src'

export default class extends PureComponent {
  constructor(props) {
    super(props)
    this.layers = [ahocevarBaseMap]
  }

  render() {
    const { layers } = this

    return (
      <Map
        style={{ display: 'flex', flexDirection: 'column', margin: 0, float: 'right' }}
        className={'md-toolbar-relative'}
        viewOptions={this.viewOptions}
        layers={layers}
      >
        {({ map }) => 'hi'}
      </Map>
    )
  }
}
