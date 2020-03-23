import React, { PureComponent } from 'react'
import {
  Button,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
} from '@material-ui/core'
import { FixedSizeList } from 'react-window'
import { createLayer, LayerTypes } from '../lib/ol'
import LegendMenu from '../modules/saeon-search/_legend-menu'

export default class extends PureComponent {
  state = { items: this.props.content }

  componentDidUpdate() {
    this.setState({ items: this.props.content })
  }

  setItems = (items) => this.setState({ items })
  render() {
    const { proxy, loadMoreItems } = this.props
    const { items } = this.state
    const { results } = items
    const { setItems } = this

    return results ? (
      <>
        <FixedSizeList height={400} width={'100%'} itemSize={125} itemCount={results.length}>
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
        <Button onClick={async () => await loadMoreItems()}>Load next 100 results ...</Button>
      </>
    ) : null
  }
}
