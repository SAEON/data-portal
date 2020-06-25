import React, { PureComponent, memo } from 'react'
import {
  Visibility,
  VisibilityOff,
  Delete,
  ExpandLess,
  ExpandMore,
  DragIndicator,
  Info as InfoIcon,
  VpnKey,
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
  Button,
  Grid,
} from '@material-ui/core'
import { MapContext } from '../../provider-map'
import { Form, DragAndDrop } from '../../../components'
import { debounce } from '../../../lib/fns'
import { useMenu } from '@saeon/snap-menus'
import { isMobile } from 'react-device-detect'

const headerButtonProps = {
  color: 'inherit',
  size: 'small',
}

const layerButtonStyle = {
  width: '100%',
}

class LayerManager extends PureComponent {
  state = {
    disableDrag: false,
  }

  render() {
    const { state } = this
    const { LegendMenu, InfoMenu } = this.props
    return (
      <MapContext.Consumer>
        {({ proxy }) => {
          return proxy.getLayers().getArray().length > 0 ? (
            <DragAndDrop
              items={proxy.getLayers().getArray()}
              reorderItems={result => {
                if (!result.destination) return
                const from = result.source.index
                const to = result.destination.index
                proxy.reorderLayers(from, to)
              }}
              listStyle={() => ({
                padding: 8,
              })}
              itemStyle={(isDragging, draggableStyle) => ({
                userSelect: 'none',
                margin: `0 0 4px 0`,
                background: isDragging ? 'lightgrey' : 'transparent',
                ...draggableStyle,
              })}
            >
              {(items, makeDraggable) =>
                items.map((layer, i) => {
                  console.log('re-rendering draggable')
                  return makeDraggable(
                    <Card
                      style={{
                        background: 'transparent',
                        borderRadius: 'unset',
                        border: 'none',
                      }}
                      variant="outlined"
                    >
                      {/* Layer item header */}
                      <CardHeader
                        component={({ children }) => (
                          <AppBar color="secondary" position="relative" variant="outlined">
                            <Toolbar style={{ paddingRight: 0, paddingLeft: 0 }} variant="dense">
                              {/* Drag icon */}
                              <DragIndicator style={{ marginRight: 10 }} />

                              {/* Title (comes from CardHeader.title prop) */}
                              {children}

                              {/* Epand layer info button */}
                              <IconButton
                                {...headerButtonProps}
                                onClick={() =>
                                  this.setState({
                                    [layer.get('id')]: state[layer.get('id')] ? false : true,
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
                            {layer.get('title')}
                          </Typography>
                        }
                      />
                      <Collapse in={state[layer.get('id')]} timeout="auto" unmountOnExit>
                        <CardContent>
                          <Grid container spacing={3}>
                            <Grid item xs={6}>
                              {/* Legend menu */}
                              <Form open={false}>
                                {({ updateForm, open }) => {
                                  const toggleMenu = () => updateForm({ open: !open })
                                  return (
                                    <>
                                      {/* Legend menu */}
                                      <LegendMenu
                                        defaultPosition={{ x: 650, y: 25 }}
                                        defaultWidth={200}
                                        title={'Legend'}
                                        defaultSnap={isMobile ? 'Top' : undefined}
                                        open={open}
                                        onClose={toggleMenu}
                                      >
                                        {layer.get('LegendMenu') ||
                                          (() => (
                                            <div style={{ marginBottom: 10 }}>
                                              <Typography>
                                                No component specified for {layer.get('title')}
                                              </Typography>
                                            </div>
                                          ))}
                                      </LegendMenu>

                                      {/* Toggle legend */}
                                      <Button
                                        style={layerButtonStyle}
                                        variant="outlined"
                                        startIcon={<VpnKey />}
                                        size="small"
                                        onClick={toggleMenu}
                                      >
                                        Legend
                                      </Button>
                                    </>
                                  )
                                }}
                              </Form>
                            </Grid>
                            <Grid item xs={6}>
                              <Form open={false}>
                                {({ updateForm, open }) => {
                                  const toggleMenu = () => updateForm({ open: !open })

                                  return (
                                    <>
                                      {/* Info menu */}
                                      <InfoMenu
                                        defaultPosition={{ x: 650, y: 25 }}
                                        defaultWidth={200}
                                        title={'Layer info'}
                                        defaultSnap={isMobile ? 'Top' : undefined}
                                        open={open}
                                        onClose={toggleMenu}
                                      >
                                        {layer.get('InfoMenu') ||
                                          (() => (
                                            <div style={{ marginBottom: 10 }}>
                                              <Typography>
                                                No component specified for {layer.get('title')}
                                              </Typography>
                                            </div>
                                          ))}
                                      </InfoMenu>

                                      {/* Toggle Info */}
                                      <Button
                                        style={layerButtonStyle}
                                        variant="outlined"
                                        startIcon={<InfoIcon />}
                                        size="small"
                                        onClick={toggleMenu}
                                      >
                                        Info
                                      </Button>
                                    </>
                                  )
                                }}
                              </Form>
                            </Grid>
                          </Grid>

                          <Form
                            effects={[debounce(({ value }) => layer.setOpacity(value / 100))]}
                            value={layer.get('opacity') * 100}
                          >
                            {({ updateForm, value }) => {
                              return (
                                <div style={{ margin: '5px 0', paddingRight: 5, width: '100%' }}>
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
                                    onChange={(e, v) => updateForm({ value: v })}
                                    aria-labelledby="discrete-slider-small-steps"
                                    step={0.00001}
                                    marks={false}
                                    min={1}
                                    max={100}
                                    valueLabelDisplay="off"
                                  />
                                </div>
                              )
                            }}
                          </Form>
                        </CardContent>
                      </Collapse>
                    </Card>,
                    i,
                    state.disableDrag,
                    layer.get('id')
                  )
                })
              }
            </DragAndDrop>
          ) : (
            'No map layers'
          )
        }}
      </MapContext.Consumer>
    )
  }
}

export default memo(() => {
  const LegendMenu = useMenu({ id: 'legend-menu' })
  const InfoMenu = useMenu({ id: 'info-menu' })
  return <LayerManager InfoMenu={InfoMenu} LegendMenu={LegendMenu} />
})
