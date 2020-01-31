import React, { PureComponent } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Collapse
} from '@material-ui/core'
import {
  DragIndicator,
  Close,
  Visibility,
  VisibilityOff,
  Delete,
  ExpandLess,
  ExpandMore
} from '@material-ui/icons'
import { DragAndDrop, Draggable } from '../../../ol-react'

export default class extends PureComponent {
  state = {}
  render() {
    const { state } = this
    const { proxy, active, close } = this.props
    return (
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
                    <Typography
                      style={{ padding: '0 50px 0 10px' }}
                      display="block"
                      variant="overline"
                    >
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
                    background: isDragging ? 'grey' : 'lightgrey',
                    ...draggableStyle
                  })}
                >
                  {(layers, makeDraggable) =>
                    layers.map((layer, i) => {
                      return makeDraggable(
                        <Card style={{ background: 'transparent' }} variant="outlined">
                          <CardHeader
                            component={({ children }) => (
                              <AppBar position="relative" variant="outlined">
                                <Toolbar style={{ paddingRight: 0 }} variant="dense">
                                  {children}
                                </Toolbar>
                              </AppBar>
                            )}
                            action={
                              <div style={{ marginLeft: 100 }}>
                                <IconButton
                                  onClick={() =>
                                    this.setState({
                                      [layer.get('id')]: state[layer.get('id')] ? false : true
                                    })
                                  }
                                  aria-label="toggle-layer-info"
                                >
                                  {state[layer.get('id')] ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                                <IconButton
                                  onClick={() => layer.setVisible(!layer.get('visible'))}
                                  aria-label="toggle-visibility"
                                >
                                  {layer.get('visible') ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                <IconButton
                                  onClick={() => proxy.removeLayer(layer)}
                                  aria-label="delete-layer"
                                >
                                  <Delete />
                                </IconButton>
                              </div>
                            }
                            title={<Typography variant="subtitle1">{layer.get('id')}</Typography>}
                          />
                          <Collapse in={state[layer.get('id')]} timeout="auto" unmountOnExit>
                            <CardContent>
                              <div>
                                <input
                                  type="range"
                                  min="0"
                                  max="100"
                                  value={layer.get('opacity') * 100}
                                  onChange={e => layer.setOpacity(e.target.value / 100)}
                                />
                              </div>
                            </CardContent>
                          </Collapse>
                        </Card>,
                        i
                      )
                    })
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
  }
}
