import React, { Component } from 'react'
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

export default class extends Component {
  constructor(props) {
    super(props)
    const cache = new CellMeasurerCache({ fixedWidth: false, defaultHeight: 125 })
    this.cache = cache
  }
  renderRow = ({ index: i, parent, /* key,*/ style }, Template) => {
    return (
      <CellMeasurer key={i} cache={this.cache} parent={parent} columnIndex={0} rowIndex={i}>
        <div style={style} id={'virtualListItem-' + i}>
          <div id={'virtualListTemplate-' + i}>
            <Template {...this.props.items[i]} />
          </div>
        </div>{' '}
      </CellMeasurer>
    )
  }

  render() {
    const {
      // loadMoreItems,
      height,
      width,
      Template,
      // items,
      // fixedSize = true,
      // itemSize = 125,
      // itemCount = 20000000,
    } = this.props

    return (
      <List
        rowCount={this.props.items.length}
        width={width}
        height={height}
        deferredMeasurementCache={this.cache}
        rowHeight={this.cache.rowHeight}
        rowRenderer={args => this.renderRow(args, Template)}
      />
    )
  }
}
