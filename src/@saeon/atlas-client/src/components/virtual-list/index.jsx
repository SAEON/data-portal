import React from 'react'
import InfiniteLoader from 'react-window-infinite-loader'
import { VariableSizeList } from 'react-window'

/**
 * A list component that makes use of react-window InfiniteLoader and FixedSizeList to allow for pagination and partial rendering of list items
 */

const itemSizes = []
const initialItems = (items, Template) => {
  const elements = []
  items.forEach((item) => {
    elements.push(
      <div>
        <Template {...item} />
      </div>
    )
  })
  return elements
}
const getItemSizes = (items, Template) => {
  const elements = initialItems(items, Template)
  elements.forEach(() => {
    itemSizes.push(125)
  })
}
export default ({
  loadMoreItems,
  height,
  width,
  Template,
  items,
  fixedSize = true,
  itemSize = 125,
  itemCount = 20000000,
}) => {
  getItemSizes(items, Template)
  const getItemSize = (index) => itemSizes[index]

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
        // <FixedSizeList
        <VariableSizeList
          style={{ transition: 'width 0.4s, height 0.4s' }}
          height={height}
          width={width}
          itemSize={() => {
            if (fixedSize) return itemSize
            else return getItemSize()
          }}
          itemCount={items.length}
          onItemsRendered={(args) => {
            getItemSize(1)
            onItemsRendered(args)
          }}
        >
          {({ index: i, style }) => {
            return (
              <div key={i} style={style} id={'virtualListItem-' + i}>
                <div id={'virtualListTemplate-' + i}>
                  <Template {...items[i]} />
                </div>
              </div>
            )
          }}
        </VariableSizeList>
        // </FixedSizeList>
      )}
    </InfiniteLoader>
  ) : null
}
