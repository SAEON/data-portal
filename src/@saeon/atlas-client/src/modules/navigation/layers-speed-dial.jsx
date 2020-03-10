import React, { Component, useState } from 'react'
import { SpeedDial } from '../../components'
import {
  Map as MapIcon,
  Layers as LayersIcon,
  Visibility,
  VisibilityOff,
  Delete,
  ExpandLess,
  ExpandMore
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
import { DragAndDrop } from '@saeon/ol-react'
import { Form } from '../../components'
import { debounce } from '../../../../fns-lib'
import { DragMenu } from '../../components'

class LayerManager extends Component {
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
              background: isDragging ? 'lightgrey' : 'transparent',
              ...draggableStyle
            })}
          >
            {(layers, makeDraggable) =>
              layers.map((layer, i) => {
                return makeDraggable(
                  <Card
                    style={{
                      background: 'transparent',
                      borderRadius: 'unset',
                      border: 'none'
                    }}
                    variant="outlined"
                  >
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
                            style={{ marginRight: 10 }}
                          >
                            <Delete />
                          </IconButton>
                        </div>
                      }
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
              })
            }
          </DragAndDrop>
        ) : (
          'No map layers'
        )}
      </>
    )
  }
}

export default ({ proxy }) => {
  const [dialOpen, setDialOpen] = useState(false)
  const [layersActive, setLayersActive] = useState(false)

  return (
    <SpeedDial
      style={{ position: 'absolute', left: 20, top: 127 }}
      onOpen={() => setDialOpen(true)}
      onClose={() => setDialOpen(false)}
      open={dialOpen}
      icon={<MapIcon />}
    >
      {[
        {
          icon: <LayersIcon />,
          tooltip: 'Active layers',
          toggle: () => setLayersActive(!layersActive),
          Component: (
            <DragMenu
              title="Layer manager"
              active={layersActive}
              close={() => setLayersActive(false)}
              proxy={proxy}
            >
              <LayerManager layersActive={layersActive} proxy={proxy} />
            </DragMenu>
          )
        }
      ]}
    </SpeedDial>
  )
}
