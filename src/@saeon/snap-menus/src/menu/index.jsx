import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton, Fade } from '@material-ui/core'
import { DragIndicator, Close as CloseIcon } from '@material-ui/icons'
import useStyles from './style'
import debounce from '../lib/debounce'
import EventBoundary from '../lib/event-boundary'
import getDimensionsFromSnap from './get-dimensions'
import getSnapZone from './get-zone'
import getPositionFromSnap from './get-position'
import clsx from 'clsx'
import MapContext from '../provider/context'
import packageJson from '../../package.json'

const configureDragHandle = (fullscreen, C, cb) => {
  if (fullscreen) return C
  else
    return (
      <div onMouseDown={cb} className="draggable-handle">
        {C}
      </div>
    )
}

// Get the width of the page
const container = document.getElementById('root')
const containerHeight = container.offsetHeight
const containerWidth = container.offsetWidth

export default ({
  title,
  children,
  resizable = true,
  defaultPosition,
  defaultWidth = 450,
  defaultHeight = 400,
  fullscreen = false,
  id,
}) => {
  if (!id)
    throw Error(
      `${packageJson.name} v${packageJson.version}. Must provide props.id to Menu component`
    )

  const classes = useStyles({ height: containerHeight, width: containerWidth })()
  const [state, setState] = useState({
    snapZone: null,
    snapped: Boolean(fullscreen),
    isResizing: false,
    dimensions: fullscreen
      ? { width: containerWidth, height: containerHeight }
      : { width: defaultWidth, height: defaultHeight },
    position: fullscreen ? { x: 0, y: 0 } : null,
  })

  return (
    <MapContext.Consumer>
      {({ setActiveMenu, getMenuById, removeMenu, getDefaultPosition }) => (
        <EventBoundary>
          {/* Snap ghost */}
          <div
            style={{
              zIndex: getMenuById(id).zIndex,
              position: 'relative',
              display: state.snapZone ? 'block' : 'none',
            }}
          >
            <div
              className={clsx({
                [classes.ghost]: true,
                [classes[state.snapZone]]: true,
              })}
            />
          </div>

          {/* Menu */}
          <div style={{ position: 'absolute' }}>
            <Draggable
              axis="both"
              handle=".draggable-handle"
              defaultPosition={
                fullscreen ? { x: 0, y: 0 } : defaultPosition || getDefaultPosition()
              }
              bounds={{ left: 0, top: 0 }}
              position={state.position}
              grid={[5, 5]}
              scale={1}
              onDrag={debounce(({ x, y }) => {
                if (state.previousDimensions) {
                  setState(
                    Object.assign(
                      { ...state },
                      {
                        position: { x: x - state.previousDimensions.width / 2, y: y - 15 },
                        dimensions: state.previousDimensions,
                        previousDimensions: null,
                      }
                    )
                  )
                }

                const snapZone = getSnapZone(x, y, container)
                if (snapZone && snapZone !== state.snapZone) {
                  setState(
                    Object.assign(
                      { ...state },
                      {
                        snapZone,
                      }
                    )
                  )
                } else if (!snapZone && state.snapZone) {
                  setState(
                    Object.assign(
                      { ...state },
                      {
                        snapZone,
                      }
                    )
                  )
                }
              })}
              onStop={() => {
                if (state.snapZone) {
                  const dimensions = getDimensionsFromSnap(state.snapZone, container)
                  const position = getPositionFromSnap(state.snapZone, container)
                  const previousDimensions = state.dimensions
                  setState(
                    Object.assign(
                      { ...state },
                      {
                        snapZone: null,
                        snapped: true,
                        dimensions,
                        position,
                        previousDimensions,
                      }
                    )
                  )
                } else {
                  setState(
                    Object.assign(
                      { ...state },
                      {
                        snapped: false,
                        position: null,
                        previousDimensions: null,
                      }
                    )
                  )
                }
              }}
            >
              <div
                style={{
                  opacity: state.snapped || fullscreen ? 0.95 : 0.8,
                  zIndex: getMenuById(id).zIndex,
                  position: 'relative',
                }}
              >
                <Fade in={true}>
                  <Card style={state.snapped ? { borderRadius: 0 } : {}} variant="elevation">
                    <ResizableBox
                      resizeHandles={resizable ? ['se'] : []}
                      width={state.dimensions.width}
                      height={state.dimensions.height}
                      axis={resizable ? 'both' : 'none'}
                      minConstraints={[Math.min(250, defaultWidth), Math.min(200, defaultHeight)]}
                      draggableOpts={{ grid: [5, 5] }}
                      onResizeStart={() => {
                        if (!resizable) return
                        setState(
                          Object.assign(
                            { ...state },
                            {
                              isResizing: true,
                              dimensions: { ...state.dimensions },
                            }
                          )
                        )
                      }}
                      onResizeStop={(e, { size }) => {
                        if (!resizable) return
                        setState(
                          Object.assign(
                            { ...state },
                            {
                              dimensions: {
                                width: size.width,
                                height: size.height,
                              },
                              isResizing: false,
                            }
                          )
                        )
                      }}
                    >
                      <CardContent style={{ padding: 0 }}>
                        {configureDragHandle(
                          fullscreen,
                          <AppBar position="relative" variant="outlined">
                            <Toolbar disableGutters className="thin-header">
                              <DragIndicator />
                              <Typography variant="overline">{title}</Typography>

                              <IconButton
                                onClick={(e) => {
                                  removeMenu(id)
                                }}
                                edge="start"
                                color="inherit"
                                style={{ order: 2, marginLeft: 'auto', padding: 2 }}
                                aria-label="close"
                              >
                                <CloseIcon />
                              </IconButton>
                            </Toolbar>
                          </AppBar>,
                          () => () => setActiveMenu(id)
                        )}
                      </CardContent>
                      <div className={classes.menuContent}>
                        <div
                          className={clsx({
                            [classes.resizing]: state.isResizing,
                            'thin-scrollbar': true,
                          })}
                        >
                          <CardContent style={{ paddingBottom: 12 }}>
                            {typeof children === 'function'
                              ? children({
                                  height: state.dimensions.height - 70,
                                  width: state.dimensions.width - 32,
                                })
                              : children}
                          </CardContent>
                        </div>
                      </div>
                    </ResizableBox>
                  </Card>
                </Fade>
              </div>
            </Draggable>
          </div>
        </EventBoundary>
      )}
    </MapContext.Consumer>
  )
}
