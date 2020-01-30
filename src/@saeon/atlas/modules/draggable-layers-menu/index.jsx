import React from 'react'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close } from '@material-ui/icons'
import { DragAndDrop, Draggable } from '../../../ol-react'

export default ({ proxy, active, close }) => (
  <Draggable>
    <div
      style={{
        opacity: 0.8,
        zIndex: 50,
        position: 'relative',
        display: active ? 'block' : 'none'
      }}
    >
      <Card variant="elevation">
        <CardContent style={{ padding: 0 }}>
          <div className="draggable-handle">
            <AppBar position="relative" variant="outlined">
              <Toolbar disableGutters variant="dense">
                <DragIndicator />
                <Typography style={{ padding: '0 50px 0 10px' }} display="block" variant="overline">
                  Active Layers
                </Typography>
                <IconButton
                  onClick={close}
                  edge="start"
                  color="inherit"
                  style={{ order: 2, marginLeft: 'auto' }}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>
        </CardContent>
        <CardContent>
          {proxy.getLayers().getArray().length > 0 ? (
            <DragAndDrop
              layers={proxy.getLayers().getArray()}
              reorderItems={result => {
                if (!result.destination) return
                const from = result.source.index
                const to = result.destination.index
                proxy.reorderLayers(from, to)
              }}
              listStyle={() => ({
                padding: 8
              })}
              itemStyle={(isDragging, draggableStyle) => ({
                userSelect: 'none',
                margin: `0 0 4px 0`,
                padding: '4px',
                background: isDragging ? 'grey' : 'lightgrey',
                ...draggableStyle
              })}
            >
              {(layers, makeDraggable) =>
                layers.map((layer, i) =>
                  makeDraggable(
                    <div>
                      {layer.get('id')}
                      <span>({JSON.stringify(layer.get('visible'))})</span>
                      <button onClick={() => layer.setVisible(!layer.get('visible'))}>
                        Toggle visible
                      </button>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={layer.get('opacity') * 100}
                        onChange={e => layer.setOpacity(e.target.value / 100)}
                      />
                      <button onClick={() => proxy.removeLayer(layer)}>Remove layer</button>
                    </div>,
                    i
                  )
                )
              }
            </DragAndDrop>
          ) : (
            'No map layers'
          )}
        </CardContent>
      </Card>
    </div>
  </Draggable>
)
