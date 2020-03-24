import React, { Component } from 'react'
import {
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import { createLayer, LayerTypes } from '../../lib/ol'
import LegendMenu from '../../modules/saeon-search/_legend-menu'

/**
 * A list component that makes use of react-window InfiniteLoader and FixedSizeList to allow for pagination and partial rendering of list items
 */
export default class VirtualList extends Component {
  state = { items: this.props.content }

  componentDidUpdate() {
    // this.setState({ items: this.props.content })
  }

  setItems = (items) => this.setState({ items })
  render() {
    const { proxy, loadMoreItems, height, width } = this.props
    const { items } = this.state
    const { results } = items
    const { setItems } = this

    return results ? (
      <>
        <InfiniteLoader
          isItemLoaded={(currentIndex) => {
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
              style={{ transition: 'width 0.4s, height 0.4s' }}
              height={height - 230}
              width={width - 40}
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
                              // TODO - this will be obsolute soon
                              let serverAddress = `${protocol}//${host}${pathname}`
                              if (process.env.NODE_ENV === 'PRODUCTION')
                                serverAddress = serverAddress.replace(
                                  'http://app01.saeon.ac.za',
                                  'https://spatialdata.saeon.ac.za'
                                )
                              console.log(serverAddress)

                              proxy.addLayer(
                                createLayer({
                                  LegendMenu: () => (
                                    <LegendMenu
                                      title={layerId}
                                      uri={`${serverAddress}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&FORMAT=image%2Fpng&TRANSPARENT=true&LAYER=${layers}&LEGEND_OPTIONS=forceLabels:on`}
                                    />
                                  ),
                                  layerType: LayerTypes.TileWMS,
                                  id: layerId,
                                  title: layerId,
                                  uri: serverAddress,
                                  LAYERS: layers,
                                })
                              )
                              newItems = items.results.map((r) =>
                                Object.assign(r, {
                                  selected: layerId === r.layerId ? true : r.selected,
                                })
                              )
                            } else {
                              proxy.removeLayerById(layerId)
                              newItems = items.results.map((r) =>
                                Object.assign(r, {
                                  selected: layerId === r.layerId ? false : r.selected,
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
