import React, { Component } from 'react'
import {
  Visibility,
  VisibilityOff,
  Delete,
  ExpandLess,
  ExpandMore,
  DragIndicator,
  Info as InfoIcon,
  VpnKey
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
  Slider,
  Button
} from '@material-ui/core'
import { Form, DragAndDrop } from '../../components'
import { debounce } from '../../../../fns-lib'

const headerButtonProps = {
  color: 'inherit',
  size: 'small'
}

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
                      borderRadius: 'unset',
                      border: 'none'
                    }}
                    variant="outlined"
                  >
                    {/* Layer item header */}
                    <CardHeader
                      component={({ children }) => (
                        <AppBar position="relative" variant="outlined">
                          <Toolbar
                            style={{ paddingRight: 0, paddingLeft: 0 }}
                            className="thin-toolbar"
                          >
                            {/* Drag icon */}
                            <DragIndicator style={{ marginRight: 10 }} />

                            {/* Title (comes from CardHeader.title prop) */}
                            {children}

                            {/* Epand layer info button */}
                            <IconButton
                              {...headerButtonProps}
                              onClick={() =>
                                this.setState({
                                  [layer.get('id')]: state[layer.get('id')] ? false : true
                                })
                              }
                              aria-label="expand-item-card"
                            >
                              {state[layer.get('id')] ? <ExpandLess /> : <ExpandMore />}
                            </IconButton>

                            {/* Toggle layer visibility icon */}
                            <IconButton
                              {...headerButtonProps}
                              onClick={() => layer.setVisible(!layer.get('visible'))}
                              aria-label="toggle-visibility"
                            >
                              {layer.get('visible') ? <Visibility /> : <VisibilityOff />}
                            </IconButton>

                            {/* Delete layer icon */}
                            <IconButton
                              {...headerButtonProps}
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
                        <Button
                          className="layer-info-control"
                          variant="outlined"
                          startIcon={<VpnKey />}
                          onClick={() => alert('hi')}
                          size="small"
                        >
                          Legend
                        </Button>
                        <Button
                          className="layer-info-control"
                          variant="outlined"
                          startIcon={<InfoIcon />}
                          onClick={() => alert('hi')}
                          size="small"
                        >
                          Layer info
                        </Button>
                        <Form value={layer.get('opacity') * 100}>
                          {({ updateForm, value }) => (
                            <div className="layer-info-control">
                              <Typography style={{ display: 'table-cell', paddingRight: 20 }}>
                                Opacity
                              </Typography>
                              <Slider
                                style={{ display: 'table-cell' }}
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
                            </div>
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
