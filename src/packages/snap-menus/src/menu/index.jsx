import 'react-resizable/css/styles.css'
import React, { useState, useEffect, forwardRef } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import { Card, CardContent, AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { DragIndicator, Close as CloseIcon } from '@material-ui/icons'
import useStyles from './style'
import EventBoundary from '../lib/event-boundary'
import getDimensions from './get-dimensions'
import getSnapZone from './get-zone'
import getPosition from './get-position'
import clsx from 'clsx'

export default forwardRef(
  (
    {
      // From Provider
      containerHeight,
      containerWidth,
      VERTICAL_OFFSET_TOP,
      HORIZONTAL_MARGIN,

      // From hook
      renderMenu,
      getDefaultPosition,
      getActiveMenuZIndex,

      // From user
      title,
      children,
      resizable = true,
      defaultPosition,
      defaultWidth = 450,
      defaultHeight = 400,
      defaultSnap = false,
      open,
      onClose,
    },
    ref
  ) => {
    const classes = useStyles({ containerHeight, containerWidth, HORIZONTAL_MARGIN })()
    const [zIndex, setZIndex] = useState(null)
    const [state, setState] = useState({
      initialized: true,
      snapped: Boolean(defaultSnap),
      isResizing: false,
      dimensions: defaultSnap
        ? getDimensions(defaultSnap, containerWidth, containerHeight, HORIZONTAL_MARGIN)
        : { width: defaultWidth, height: defaultHeight },
      position: getPosition(defaultSnap, containerWidth, containerHeight, HORIZONTAL_MARGIN),
      previousDimensions: { width: defaultWidth, height: defaultHeight },
    })

    useEffect(() => {
      if (zIndex < getActiveMenuZIndex()) {
        setZIndex(getActiveMenuZIndex())
      }
      ref.current = zIndex
    }, [open, zIndex])

    return !state.initialized
      ? null
      : renderMenu(
          <div style={{ display: open ? 'block' : 'none' }}>
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
                  handle=".drag-handle"
                  defaultPosition={
                    defaultSnap
                      ? getPosition(defaultSnap, containerWidth, containerHeight, HORIZONTAL_MARGIN)
                      : defaultPosition || getDefaultPosition()
                  }
                  bounds={{ left: 0, top: 0 }}
                  position={state.position}
                  grid={[1, 1]}
                  scale={1}
                  onStart={({ clientX: x, clientY: y , target}) => {
                    /**
                     * Actually need to check if there is a class 'drag-handle'
                     * But it seems the target button doesn't include a className
                     **/ 
                    if (!target.className.includes) {
                      return 
                    }

                    /**
                     * If the drag handle is selected
                     * update the zIndex
                     */
                    setZIndex(getActiveMenuZIndex())

                     /**
                     * previousDimensions is only set when
                     * a menu is 'snapped'
                     */
                    if (state.previousDimensions) {
                      setState(
                        Object.assign(
                          { ...state },
                          {
                            position: {
                              x: x - state.previousDimensions.width / 2,
                              y: y - 15 - VERTICAL_OFFSET_TOP,
                            },
                            dimensions: state.previousDimensions,
                            previousDimensions: null,
                          }
                        )
                      )
                    }
                  }}
                  onStop={({ clientX: x, clientY: y }) => {
                    // Check if there is a snapZone
                    const snapZone = getSnapZone(
                      x,
                      y,
                      containerWidth,
                      containerHeight,
                      VERTICAL_OFFSET_TOP,
                    )

                    if (snapZone) {
                      const dimensions = getDimensions(snapZone, containerWidth, containerHeight, HORIZONTAL_MARGIN)
                      const position = getPosition(snapZone, containerWidth, containerHeight, HORIZONTAL_MARGIN)
                      const previousDimensions = state.dimensions
                      setState(
                        Object.assign(
                          { ...state },
                          {
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
                          minConstraints={[
                            Math.min(250, defaultWidth),
                            Math.min(200, defaultHeight),
                          ]}
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
                                  snapped: false,
                                  previousDimensions: null,
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
                                  onTouchStart={onClose}
                                  onClick={() => onClose()}
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
                  </div>
                </Draggable>
              </div>
            </EventBoundary>
          </div>
        )
  }
)
