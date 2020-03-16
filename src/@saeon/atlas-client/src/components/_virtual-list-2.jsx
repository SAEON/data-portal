import React, { PureComponent } from 'react'
import {
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox
} from '@material-ui/core'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import { addTileWMSLayer } from '../lib/ol'

export default class extends PureComponent {
  state = { items: this.props.content }

  componentDidUpdate() {
    this.setState({ items: this.props.content })
  }

  setItems = items => this.setState({ items })
  render() {
    const { proxy, loadMoreItems, height, width } = this.props
    const { items } = this.state
    const { results } = items
    const { setItems } = this

    return results ? (
      <>
        <InfiniteLoader
          isItemLoaded={currentIndex => {
            // If there are less results than a single pagniation, then everything is loaded
            if (results.length < 100) return true
            // If the current item index is smaller than the result set, then current item is loaded
            if (currentIndex < results.length) {
              return true
            } else {
              return false
            }
          }}
          itemCount={20000000}
          loadMoreItems={async () => await loadMoreItems()}
          threshold={1}
        >
          {({ onItemsRendered }) => (
            <FixedSizeList
              height={height - 230}
              width={width - 25}
              itemSize={125}
              itemCount={results.length}
              onItemsRendered={onItemsRendered}
            >
              {({ index: i, style }) => {
                const r = results[i]
                const { layerId, selected, protocol, host, pathname, layers } = r
                return (
                  <div key={i} style={style}>
                    <ListItem ContainerComponent="div" button>
                      <ListItemText
                        style={{ display: 'block', overflow: 'hidden' }}
                        id={r.layerId}
                        primary={r.layerId}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="end"
                          checked={selected}
                          onChange={({ target }) => {
                            var newItems
                            if (target.checked) {
                              const serverAddress = `${protocol}//${host}${pathname}`
                              proxy.addLayer(
                                addTileWMSLayer({
                                  id: layerId,
                                  title: layerId,
                                  url: serverAddress,
                                  name: layers
                                })
                              )
                              newItems = items.results.map(r =>
                                Object.assign(r, {
                                  selected: layerId === r.layerId ? true : r.selected
                                })
                              )
                            } else {
                              proxy.removeLayerById(layerId)
                              newItems = items.results.map(r =>
                                Object.assign(r, {
                                  selected: layerId === r.layerId ? false : r.selected
                                })
                              )
                            }

                            setItems(Object.assign({ ...items }, { results: newItems }))
                          }}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>
                  </div>
                )
              }}
            </FixedSizeList>
          )}
        </InfiniteLoader>
        <Button onClick={async () => await loadMoreItems()}>Load next 100 results ...</Button>
      </>
    ) : null
  }
}
