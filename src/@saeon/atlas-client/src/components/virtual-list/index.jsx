import React from 'react'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'

/**
 * A list component that makes use of react-window InfiniteLoader and FixedSizeList to allow for pagination and partial rendering of list items
 */
export default ({ loadMoreItems, height, width, Template, items }) =>
  items.length ? (
    <InfiniteLoader
      isItemLoaded={(currentIndex) =>
        items.length < 100 || currentIndex < items.length ? true : false
      }
      itemCount={20000000}
      loadMoreItems={async () => await loadMoreItems()}
      threshold={1}
    >
      {({ onItemsRendered }) => (
        <FixedSizeList
          style={{ transition: 'width 0.4s, height 0.4s' }}
          height={height - 175}
          width={width - 40}
          itemSize={125}
          itemCount={items.length}
          onItemsRendered={onItemsRendered}
        >
          {({ index: i, style }) => {
            return (
              <div key={i} style={style}>
                <Template {...items[i]} />
              </div>
            )
          }}
        </FixedSizeList>
      )}
    </InfiniteLoader>
  ) : null
