import 'react-resizable/css/styles.css'
import React, { useState, useEffect, forwardRef } from 'react'
import Draggable from 'react-draggable'
import { ResizableBox } from 'react-resizable'
import {
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Fade,
} from '@material-ui/core'
import {
  Close as CloseIcon,
  Minimize as MinimizeIcon,
  CheckBoxOutlineBlank as MaximizeIcon,
} from '@material-ui/icons'
import useStyles from './style'
import debounce from '../lib/debounce'
import EventBoundary from '../lib/event-boundary'
import getDimensions from './get-dimensions'
import getSnapZone from './get-zone'
import getPosition from './get-position'
import clsx from 'clsx'
import parseEventXY from './parse-event-x-y'

var allowInteractions = true
var timer
const MENU_HEADER_HEIGHT = 31

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

    /**
     * zIndex is set to the ref, and used to parse height
     * back to the parent component so that other menu
     * instances can be updated to zIndex + 1 height
     */
    const [zIndex, setZIndex] = useState(null)

    /**
     * This is set/unset in the onDrag callback
     * Used only by the dropzone shadow div
     */
    const [snapZone, setSnapZone] = useState(null)

    // General state
    const [state, setState] = useState({
      minimized: false,
      maximizedHeight: null,
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

    return renderMenu(
      <div style={{ display: open ? 'block' : 'none' }}>
        <EventBoundary>
          {/* Snap ghost */}
          <div
            style={{
              zIndex,
              position: 'relative',
              display: snapZone ? 'block' : 'none',
            }}
          >
            <div
              className={clsx({
                [classes.ghost]: true,
                [classes[snapZone]]: true,
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
              onStart={ev => {
                /**
                 * Stop interactions with the menus for 1 second
                 */
                allowInteractions = false
                clearTimeout(timer)
                timer = setTimeout(() => (allowInteractions = true), 100)

                const { x, y } = parseEventXY(ev)
                const { target } = ev
                const { className } = target

                /**
                 * Make sure that drag-handle is the event target
                 * There can be other elements in the header that
                 * SHOULD NOT trigger drag
                 */
                if (typeof className !== 'string') return

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
                        dimensions: Object.assign(
                          { ...state.previousDimensions },
                          {
                            height: state.minimized
                              ? MENU_HEADER_HEIGHT
                              : state.maximizedHeight || state.previousDimensions.height,
                          }
                        ),
                        previousDimensions: null,
                        maximizedHeight: defaultHeight,
                      }
                    )
                  )
                }
              }}
              onDrag={debounce(ev => {
                const { x, y } = parseEventXY(ev)

                /**
                 * Check if the user is hovering over a snap zone
                 */
                const newSnapZone = getSnapZone(
                  x,
                  y,
                  containerWidth,
                  containerHeight,
                  VERTICAL_OFFSET_TOP
                )

                if (snapZone && !newSnapZone) {
                  setSnapZone(null)
                } else if (newSnapZone) {
                  setSnapZone(newSnapZone)
                }
              }, 10)}
              onStop={ev => {
                /**
                 * For touch devices, this event
                 * is fired twice. discard the non-touch
                 * event (but either could be discarded)
                 */
                if (ev.constructor !== TouchEvent && ev.constructor !== MouseEvent) {
                  return
                }

                const { x, y } = parseEventXY(ev)

                /**
                 * Reset state.snapZone (used by the ghost component)
                 */
                setSnapZone(undefined)

                /**
                 * Check if the menu has been
                 * dropped in a snap zone
                 *
                 * allowInteractions is false for
                 * 100ms after a menu is clicked
                 * to prevent immediate snapping
                 */
                const snapZone = allowInteractions
                  ? getSnapZone(x, y, containerWidth, containerHeight, VERTICAL_OFFSET_TOP)
                  : undefined

                if (snapZone) {
                  setState(
                    Object.assign(
                      { ...state },
                      {
                        minimized: false,
                        snapped: true,
                        dimensions: getDimensions(
                          snapZone,
                          containerWidth,
                          containerHeight,
                          HORIZONTAL_MARGIN
                        ),
                        position: getPosition(
                          snapZone,
                          containerWidth,
                          containerHeight,
                          HORIZONTAL_MARGIN
                        ),
                        previousDimensions: state.dimensions,
                      }
                    )
                  )
                } else {
                  setState(
                    Object.assign(
                      { ...state },
                      {
                        snapped: false,
                        position: undefined,
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
                <Fade key="menu-fade" in={open}>
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
                            <Typography style={{ margin: 'auto' }} variant="overline">
                              {title}
                            </Typography>
                            <div style={{ position: 'absolute', right: 0 }}>
                              <Tooltip title={open ? 'Collapse menu' : ''}>
                                <IconButton
                                  onTouchStart={onClose}
                                  onClick={() => {
                                    setState(
                                      Object.assign(
                                        { ...state },
                                        {
                                          minimized: !state.minimized,
                                          maximizedHeight: state.minimized
                                            ? null
                                            : state.dimensions.height,
                                          dimensions: {
                                            width: state.dimensions.width,
                                            height: state.minimized
                                              ? state.maximizedHeight || defaultHeight
                                              : MENU_HEADER_HEIGHT,
                                          },
                                        }
                                      )
                                    )
                                  }}
                                  edge="start"
                                  color="inherit"
                                  style={{
                                    order: 2,
                                    marginLeft: 'auto',
                                    padding: 2,
                                  }}
                                  aria-label="close"
                                >
                                  {state.minimized ? (
                                    <Fade key="menu-minimized" in={state.minimized}>
                                      <MaximizeIcon />
                                    </Fade>
                                  ) : (
                                    <span>
                                      <Fade key="menu-maximized" in={!state.minimized}>
                                        <MinimizeIcon />
                                      </Fade>
                                    </span>
                                  )}
                                </IconButton>
                              </Tooltip>
                              <Tooltip title={open ? 'Close menu' : ''}>
                                <IconButton
                                  onTouchStart={onClose}
                                  onClick={() => onClose()}
                                  edge="start"
                                  color="inherit"
                                  style={{
                                    order: 2,
                                    marginLeft: 'auto',
                                    padding: 2,
                                  }}
                                  aria-label="close"
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Tooltip>
                            </div>
                          </Toolbar>
                        </AppBar>
                      </CardContent>

                      <div
                        className={clsx({
                          [classes.menuContent]: true,
                        })}
                      >
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
      </div>
    )
  }
)
