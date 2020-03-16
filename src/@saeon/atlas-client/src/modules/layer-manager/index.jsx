import React, { Component } from 'react'
import {
  Visibility,
  VisibilityOff,
  Delete,
  ExpandLess,
  ExpandMore,
  DragIndicator
} from '@material-ui/icons'
import {
  Card,
  CardContent,
  CardHeader,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Collapse,
  Slider
} from '@material-ui/core'
import { Form, DragAndDrop } from '../../components'
import { debounce } from '../../../../fns-lib'

export default class extends Component {
  state = {
    disableDrag: false
  }

  shouldComponentUpdate() {
    return true
  }

  render() {
    const { state } = this
    const { proxy } = this.props
    return (
      <>
        {proxy.getLayers().getArray().length > 0 ? (
          <DragAndDrop
            items={proxy.getLayers().getArray()}
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
              background: isDragging ? 'lightgrey' : 'transparent',
              ...draggableStyle
            })}
          >
            {(items, makeDraggable) =>
              items.map((layer, i) =>
                // A single layer item
                makeDraggable(
                  <Card
                    style={{
                      background: 'transparent',
                      borderRadius: 'unset'
                    }}
                    variant="outlined"
                  >
                    <CardHeader
                      component={({ children }) => (
                        <AppBar position="relative" variant="outlined">
                          <Toolbar
                            style={{ paddingRight: 0, paddingLeft: 0 }}
                            className="thin-toolbar"
                          >
                            <DragIndicator style={{ marginRight: 10 }} />
                            {children}
                            <IconButton
                              size="small"
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
                              size="small"
                              onClick={() => layer.setVisible(!layer.get('visible'))}
                              aria-label="toggle-visibility"
                            >
                              {layer.get('visible') ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => proxy.removeLayer(layer)}
                              aria-label="delete-layer"
                              style={{ marginRight: 10 }}
                            >
                              <Delete />
                            </IconButton>
                          </Toolbar>
                        </AppBar>
                      )}
                      title={
                        <Typography style={{ wordBreak: 'break-word' }} variant="caption">
                          {layer.get('id')}
                        </Typography>
                      }
                    />
                    <Collapse in={state[layer.get('id')]} timeout="auto" unmountOnExit>
                      <CardContent>
                        <Form value={layer.get('opacity') * 100}>
                          {({ updateForm, value }) => (
                            <Slider
                              onMouseEnter={() => this.setState({ disableDrag: true })}
                              onMouseLeave={() => this.setState({ disableDrag: false })}
                              defaultValue={50}
                              getAriaValueText={() => parseInt(value, 10)}
                              value={value}
                              onChange={(e, v) =>
                                updateForm(
                                  { value: v },
                                  debounce(() => layer.setOpacity(v / 100))
                                )
                              }
                              aria-labelledby="discrete-slider-small-steps"
                              step={0.00001}
                              marks={false}
                              min={1}
                              max={100}
                              valueLabelDisplay="off"
                            />
                          )}
                        </Form>
                      </CardContent>
                    </Collapse>
                  </Card>,
                  i,
                  this.state.disableDrag
                )
              )
            }
          </DragAndDrop>
        ) : (
          'No map layers'
        )}
      </>
    )
  }
}
