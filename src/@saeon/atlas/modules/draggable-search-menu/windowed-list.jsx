import React, { PureComponent } from 'react'
import { List, ListItem, ListItemText, ListItemSecondaryAction, Checkbox } from '@material-ui/core'
// import { FixedSizeList } from 'react-window' // TODO - this is the better approach, but I couldn't get the styling to work

import { Tile as TileLayer } from 'ol/layer.js'
import { TileWMS } from 'ol/source'

export const newLayer = ({ id, title, url, name }) => {
  return new TileLayer({
    id,
    title: title || id,
    visible: true,
    source: new TileWMS({
      url,
      params: {
        LAYERS: name,
        TILED: true,
        FORMAT: 'image/png'
      },
      serverType: 'geoserver',
      transition: 500
    }),
    opacity: 0.7
  })
}

export default class extends PureComponent {
  state = {
    items: this.props.content
  }

  componentDidUpdate() {
    this.setState({ items: this.props.content })
  }

  setItems = items => this.setState({ items })
  render() {
    const { proxy, loadMoreItems } = this.props
    const { items } = this.state
    const { setItems } = this
    return items.results ? (
      <List dense style={{ height: '200px', width: '100%', overflow: 'auto' }}>
        {items.results.map((r, i) => {
          const { layerId, selected, protocol, host, pathname, layers } = r
          return (
            <ListItem key={i} button>
              <ListItemText id={r.layerId} primary={r.layerId} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  checked={selected}
                  onChange={({ target }) => {
                    var newItems
                    if (target.checked) {
                      const serverAddress = `${protocol}//${host}${pathname}`
                      proxy.addLayer(
                        newLayer({
                          id: layerId,
                          title: layerId,
                          url: serverAddress,
                          name: layers
                        })
                      )
                      newItems = items.results.map(r =>
                        Object.assign(r, { selected: layerId === r.layerId ? true : r.selected })
                      )
                    } else {
                      proxy.removeLayerById(layerId)
                      newItems = items.results.map(r =>
                        Object.assign(r, { selected: layerId === r.layerId ? false : r.selected })
                      )
                    }

                    setItems(Object.assign({ ...items }, { results: newItems }))
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
          )
        })}
        <ListItem button onClick={async () => await loadMoreItems()}>
          <ListItemText primary={'Load next 100 results ...'} />
        </ListItem>
      </List>
    ) : null
  }
}
