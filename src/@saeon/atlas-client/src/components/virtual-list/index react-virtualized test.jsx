import React from 'react'
import InfiniteLoader from 'react-window-infinite-loader'
import { VariableSizeList } from 'react-window'
import { PureComponent } from 'react'

/**
 * A list component that makes use of react-window InfiniteLoader and FixedSizeList to allow for pagination and partial rendering of list items
 */

var itemSizes = []
const getItemSize = (index) => itemSizes[index]

const getItemSizes = (items, Template) => {
  items.forEach(() => {
    itemSizes.push(125)
  })
  return itemSizes
}

export default class extends PureComponent {
  constructor(props) {
    super(props)

    this.state = this.initializeState(props.items, props.Template)
  }

  initializeState(items, Template) {
    const itemSize = this.props.itemSize ? this.props.itemSize : 125
    var state = { itemSizes: [], listItems: [] }
    for (var i = 0; i < items.length; i++) {
      state.listItems.push(<Template {...items[i]} />)
      state.itemSizes.push(itemSize)
    }
    return state
  }

  componentDidMount() {
    const { items } = this.props
    console.log('mounted')
    var newItemSizes = []
    for (var i = 0; i < items.length; i++) {
      const height = document.getElementById('virtualListTemplate-' + i)?.clientHeight
      newItemSizes.push(height)
    }
    this.setState({ itemSizes: newItemSizes })
  }

  render() {
    const { loadMoreItems, height, width, items, itemCount = 20000000 } = this.props

    return items.length ? (
      <InfiniteLoader
        isItemLoaded={(currentIndex) =>
          items.length < 100 || currentIndex < items.length ? true : false
        }
        itemCount={itemCount}
        loadMoreItems={async () => await loadMoreItems()}
        threshold={1}
      >
        {({ onItemsRendered }) => (
          <VariableSizeList
            style={{ transition: 'width 0.4s, height 0.4s' }}
            height={height}
            width={width}
            itemSize={(index) => this.state.itemSizes[index]}
            itemCount={items.length}
            onItemsRendered={onItemsRendered}
          >
            {({ index: i, style }) => {
              return (
                <div key={i} style={style} id={'virtualListItem-' + i}>
                  <div id={'virtualListTemplate-' + i}>{this.state.listItems[i]}</div>
                </div>
              )
            }}
          </VariableSizeList>
        )}
      </InfiniteLoader>
    ) : null
  }
}
