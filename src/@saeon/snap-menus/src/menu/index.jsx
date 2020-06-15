import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton, Fade } from '@material-ui/core'
import { DragIndicator, Close as CloseIcon } from '@material-ui/icons'
import useStyles from './style'
import debounce from '../lib/debounce'
import EventBoundary from '../lib/event-boundary'
import getDimensions from './get-dimensions'
import getSnapZone from './get-zone'
import getPosition from './get-position'
import clsx from 'clsx'
import MapContext from '../provider/context'
import packageJson from '../../package.json'

// Get the width of the page
const container = document.getElementById('root')
const containerHeight = container.offsetHeight - 85 // TODO
const containerWidth = container.offsetWidth - 10 // TODO

export default ({
  title,
  children,
  resizable = true,
  defaultPosition,
  defaultWidth = 450,
  defaultHeight = 400,
  defaultSnap = false,
  id,
}) => {
  if (!id)
    throw Error(
      `${packageJson.name} v${packageJson.version}. Must provide props.id to Menu component`
    )

  const classes = useStyles({ height: containerHeight, width: containerWidth })()
  const [state, setState] = useState({
    snapZone: null,
    snapped: Boolean(defaultSnap),
    isResizing: false,
    dimensions: defaultSnap
      ? getDimensions(defaultSnap, container)
      : { width: defaultWidth, height: defaultHeight },
    position: defaultSnap ? getPosition(defaultSnap, container) : null,
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
              handle=".drag-handle"
              defaultPosition={
                defaultSnap
                  ? getPosition(defaultSnap, container)
                  : defaultPosition || getDefaultPosition()
              }
              bounds={{ left: 0, top: 0 }}
              position={state.position}
              grid={[1, 1]}
              scale={1}
              onStart={() => setActiveMenu(id)}
              onDrag={debounce(ev => {
                const newState = {}

                // Get x,y from the event (could be a touch for mobile, click elsewise)
                let x, y
                if (ev.constructor === MouseEvent) {
                  x = ev.x
                  y = ev.y
                } else if (ev.constructor === TouchEvent) {
                  const { touches } = ev
                  const touch = touches[0]
                  x = touch.clientX
                  y = touch.clientY
                } else {
                  throw new Error(
                    `${packageJson.name} v${packageJson.version} ERROR: Unrecognized event type in onDrag handler`
                  )
                }

                if (state.previousDimensions) {
                  newState.position = { x: x - state.previousDimensions.width / 2, y: y - 15 - 55 } // TODO - the 55 comes from scss
                  newState.dimensions = state.previousDimensions
                  newState.previousDimensions = null
                  newState.snapZone = null
                }

                const snapZone = getSnapZone(x, y, container)
                if (!state.previousDimensions) {
                  if (snapZone && snapZone !== state.snapZone) {
                    newState.snapZone = snapZone
                  } else if (!snapZone && state.snapZone) {
                    newState.snapZone = snapZone
                  }
                }

                setState(Object.assign({ ...state }, newState))
              }, 5)}
              onStop={() => {
                if (state.snapZone) {
                  const dimensions = getDimensions(state.snapZone, container)
                  const position = getPosition(state.snapZone, container)
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
                  opacity: 0.8,
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
                      draggableOpts={{ grid: [1, 1] }}
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
                        <AppBar position="relative" variant="outlined">
                          <Toolbar
                            style={{ cursor: 'grab', minHeight: '25px' }}
                            disableGutters
                            className={clsx({
                              'drag-handle': true,
                            })}
                          >
                            <DragIndicator />
                            <Typography variant="overline">{title}</Typography>

                            <IconButton
                              onTouchStart={() => removeMenu(id)}
                              onClick={() => removeMenu(id)}
                              edge="start"
                              color="inherit"
                              style={{ order: 2, marginLeft: 'auto', padding: 2 }}
                              aria-label="close"
                            >
                              <CloseIcon />
                            </IconButton>
                          </Toolbar>
                        </AppBar>
                      </CardContent>
                      <div className={classes.menuContent}>
                        <div
                          className={clsx({
                            [classes.resizing]: state.isResizing,
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
