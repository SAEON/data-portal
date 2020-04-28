import 'react-resizable/css/styles.css'
import React, { useState } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import EventBoundary from './_event_boundary'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseButton } from '@material-ui/icons'
import useStyles from './_style'
import debounce from './_debounce'
import clsx from 'clsx'

// Get the width of the page
const container = document.getElementById('root')
const containerHeight = container.offsetHeight
const containerWidth = container.offsetWidth

const getPositionFromSnap = (snapZone) => {
  if (snapZone === 'Top' || snapZone === 'TopLeft' || snapZone === 'Left') return { x: 0, y: 0 }
  if (snapZone === 'Right' || snapZone === 'TopRight') return { x: containerWidth / 2, y: 0 }
  if (snapZone === 'Bottom' || snapZone === 'BottomLeft') return { x: 0, y: containerHeight / 2 }
  if (snapZone === 'BottomRight') return { x: containerWidth / 2, y: containerHeight / 2 }
  return null
}

const getDimensionsFromSnap = (snapZone) => {
  if (snapZone === 'Top') return { width: containerWidth, height: containerHeight }
  if (snapZone === 'Left' || snapZone === 'Right')
    return { width: containerWidth / 2, height: containerHeight }
  if (
    snapZone === 'TopLeft' ||
    snapZone === 'TopRight' ||
    snapZone === 'BottomLeft' ||
    snapZone === 'BottomRight'
  )
    return { width: containerWidth / 2, height: containerHeight / 2 }
  if (snapZone === 'Bottom') return { width: containerWidth, height: containerHeight / 2 }
  return null
}

const getSnapZone = (x, y) => {
  const snapZoneX = 75
  const snapZoneY = 75
  const snapTop = y <= snapZoneY ? true : false
  const snapBottom = y >= containerHeight - snapZoneY ? true : false
  const snapLeft = x <= snapZoneX ? true : false
  const snapRight = x >= containerWidth - snapZoneX ? true : false

  let snapZone = null
  if (snapLeft && snapTop) {
    snapZone = 'TopLeft'
  } else if (snapRight && snapTop) {
    snapZone = 'TopRight'
  } else if (snapLeft && snapBottom) {
    snapZone = 'BottomLeft'
  } else if (snapRight && snapBottom) {
    snapZone = 'BottomRight'
  } else if (snapTop) {
    snapZone = 'Top'
  } else if (snapLeft) {
    snapZone = 'Left'
  } else if (snapRight) {
    snapZone = 'Right'
  } else if (snapBottom) {
    snapZone = 'Bottom'
  }

  return snapZone
}

export default ({
  close,
  title,
  children,
  resizable = true,
  onMouseDown,
  zIndex = 1,
  defaultPosition = { x: 100, y: 75 },
  defaultWidth = 450,
  defaultHeight = 400,
}) => {
  const classes = useStyles({ height: containerHeight, width: containerWidth })()
  const [state, setState] = useState({
    snapZone: null,
    snapped: false,
    isResizing: false,
    dimensions: { width: defaultWidth, height: defaultHeight },
    position: null,
  })

  return (
    <EventBoundary>
      {/* Snap ghost */}
      <div
        style={{
          zIndex,
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
          defaultPosition={defaultPosition}
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

            const snapZone = getSnapZone(x, y)
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
          }, 40)}
          onStop={() => {
            if (state.snapZone) {
              const dimensions = getDimensionsFromSnap(state.snapZone)
              const position = getPositionFromSnap(state.snapZone)
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
              opacity: state.snapped ? 1 : 0.8,
              zIndex,
              position: 'relative',
            }}
          >
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
                  <div onMouseDown={onMouseDown} className="draggable-handle">
                    <AppBar position="relative" variant="outlined">
                      <Toolbar disableGutters className="thin-header">
                        <DragIndicator />
                        <Typography variant="overline">{title}</Typography>
                        <IconButton
                          onClick={close}
                          edge="start"
                          color="inherit"
                          style={{ order: 2, marginLeft: 'auto', padding: 2 }}
                          aria-label="close"
                        >
                          <CloseButton />
                        </IconButton>
                      </Toolbar>
                    </AppBar>
                  </div>
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
          </div>
        </Draggable>
      </div>
    </EventBoundary>
  )
}
