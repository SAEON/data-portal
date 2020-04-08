import React, { Component } from 'react'
import { List, AutoSizer, CellMeasurer, CellMeasurerCache } from 'react-virtualized'

export default class extends Component {
  constructor(props) {
    super(props)
    const cache = new CellMeasurerCache({ fixedWidth: false, defaultHeight: 125 })
    this.cache = cache
  }
  renderRow = ({ index: i, parent, key, style }, Template) => {
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
      loadMoreItems,
      height,
      width,
      Template,
      items,
      fixedSize = true,
      itemSize = 125,
      itemCount = 20000000,
    } = this.props

    return (
      <List
        rowCount={this.props.items.length}
        width={width}
        height={height}
        deferredMeasurementCache={this.cache}
        rowHeight={this.cache.rowHeight}
        rowRenderer={(args) => this.renderRow(args, Template)}
      />
    )
  }
}

// import React from 'react'
// import InfiniteLoader from 'react-window-infinite-loader'
// import { FixedSizeList, VariableSizeList } from 'react-window'

// /**
//  * A list component that makes use of react-window InfiniteLoader and FixedSizeList to allow for pagination and partial rendering of list items
//  */

// export default ({
//   loadMoreItems,
//   height,
//   width,
//   Template,
//   items,
//   fixedSize = true,
//   itemSize = 125,
//   itemCount = 20000000,
// }) => {
//   return items.length ? (
//     <InfiniteLoader
//       isItemLoaded={(currentIndex) =>
//         items.length < 100 || currentIndex < items.length ? true : false
//       }
//       itemCount={itemCount}
//       loadMoreItems={async () => await loadMoreItems()}
//       threshold={1}
//     >
//       {({ onItemsRendered }) => (
//         <VariableSizeList
//           style={{ transition: 'width 0.4s, height 0.4s' }}
//           height={height}
//           width={width}
//           itemSize={() => {
//             if (fixedSize) return itemSize
//             else return getItemSize()
//           }}
//           itemCount={items.length}
//           onItemsRendered={(args) => {
//             getItemSize(1)
//             onItemsRendered(args)
//           }}
//         >
//           {({ index: i, style }) => {
//             return (
//               <div key={i} style={style} id={'virtualListItem-' + i}>
//                 <div id={'virtualListTemplate-' + i}>
//                   <Template {...items[i]} />
//                 </div>
//               </div>
//             )
//           }}
//         </VariableSizeList>
//       )}
//     </InfiniteLoader>
//   ) : null
// }
