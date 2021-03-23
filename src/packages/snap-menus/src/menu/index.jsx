import 'react-resizable/css/styles.css'
import { createPortal } from 'react-dom'
import { useState, useEffect, forwardRef } from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Fade from '@material-ui/core/Fade'
import CloseIcon from '@material-ui/icons/Close'
import MinimizeIcon from '@material-ui/icons/Minimize'
import MaximizeIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import useStyles from './style.js'
import getDimensions from './fns/get-dimensions.js'
import getPosition from './fns/get-position.js'
import clsx from 'clsx'
import DragContainer from './drag-container/index.jsx'
import ResizeContainer from './resize-container/index.jsx'
import EventBoundary from './event-boundary.jsx'

const MENU_HEADER_HEIGHT = 25

export default forwardRef(
  (
    {
      // From Provider
      PORTAL,
      PORTAL_MARGIN_TOP,
      PORTAL_MARGIN_RIGHT,
      PORTAL_MARGIN_BOTTOM,
      PORTAL_MARGIN_LEFT,

      // From hook
      getDefaultPosition,
      getActiveMenuZIndex,

      // From user
      title,
      children,
      resizable = true,
      draggable = true,
      defaultPosition,
      defaultWidth = 450,
      defaultHeight = 400,
      defaultSnap = false,
      open,
      onClose = undefined,
      opacity = 0.8,
      style = {},
      disableMinify = false,
    },
    ref
  ) => {
    const GHOST_GUTTER_X = (PORTAL_MARGIN_RIGHT + PORTAL_MARGIN_LEFT) / 4
    const GHOST_GUTTER_Y = (PORTAL_MARGIN_TOP + PORTAL_MARGIN_BOTTOM) / 4
    const classes = useStyles({ PORTAL, MENU_HEADER_HEIGHT, GHOST_GUTTER_X, GHOST_GUTTER_Y })

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
        ? getDimensions(defaultSnap, PORTAL, GHOST_GUTTER_X)
        : { width: defaultWidth, height: defaultHeight },
      position: getPosition(defaultSnap, PORTAL, GHOST_GUTTER_X),
      previousDimensions: { width: defaultWidth, height: defaultHeight },
    })

    useEffect(() => {
      if (zIndex < getActiveMenuZIndex()) {
        setZIndex(getActiveMenuZIndex())
      }
      ref.current = zIndex
    }, [open, zIndex, ref, getActiveMenuZIndex])

    const onMinify = () => {
      setState(
        Object.assign(
          { ...state },
          {
            minimized: !state.minimized,
            maximizedHeight: state.minimized ? null : state.dimensions.height,
            maximizedWidth: state.minimized ? null : state.dimensions.width,
            dimensions: state.minimized
              ? {
                  width: state.maximizedWidth || defaultWidth,
                  height: state.maximizedHeight || defaultHeight,
                }
              : { width: MENU_HEADER_HEIGHT + (onClose ? 25 : 0), height: MENU_HEADER_HEIGHT },
          }
        )
      )
    }

    return createPortal(
      <EventBoundary>
        <div style={{ display: open ? 'block' : 'none' }}>
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
          <Fade key="menu-fade" in={open}>
            <div style={{ position: 'absolute' }}>
              <DragContainer
                draggable={draggable}
                defaultSnap={defaultSnap}
                defaultHeight={defaultHeight}
                defaultPosition={defaultPosition}
                getDefaultPosition={getDefaultPosition}
                state={state}
                setState={setState}
                setZIndex={setZIndex}
                getActiveMenuZIndex={getActiveMenuZIndex}
                PORTAL={PORTAL}
                snapZone={snapZone}
                setSnapZone={setSnapZone}
                GHOST_GUTTER_X={GHOST_GUTTER_X}
              >
                <div
                  style={Object.assign(style, {
                    opacity,
                    zIndex,
                    position: 'relative',
                  })}
                >
                  <Card style={state.snapped ? { borderRadius: 0 } : {}} variant="elevation">
                    <ResizeContainer
                      resizable={resizable}
                      state={state}
                      setState={setState}
                      defaultWidth={defaultWidth}
                      defaultHeight={defaultHeight}
                    >
                      <div style={{ height: '100%', position: 'relative' }}>
                        <CardContent style={{ padding: 0 }}>
                          <AppBar position="relative" variant="outlined">
                            <Toolbar
                              style={{ cursor: draggable ? 'grab' : 'default', minHeight: '25px' }}
                              disableGutters
                              className={clsx({
                                'drag-handle': draggable ? true : false,
                              })}
                            >
                              {state.minimized ? undefined : (
                                <Typography
                                  style={{ margin: 'auto', fontSize: '0.7em' }}
                                  variant="overline"
                                >
                                  {title}
                                </Typography>
                              )}
                              <div style={{ position: 'absolute', right: 0 }}>
                                {disableMinify ? undefined : (
                                  <Tooltip
                                    title={
                                      state.minimized ? `Expand ${title}` : `Collapse ${title}`
                                    }
                                  >
                                    <IconButton
                                      onTouchStart={onMinify}
                                      onClick={onMinify}
                                      edge="start"
                                      color="inherit"
                                      style={{
                                        order: 2,
                                        marginLeft: 'auto',
                                        padding: 2,
                                      }}
                                      size="small"
                                      aria-label="close"
                                    >
                                      {state.minimized ? (
                                        <Fade key="menu-minimized" in={state.minimized}>
                                          <MaximizeIcon fontSize="small" />
                                        </Fade>
                                      ) : (
                                        <span>
                                          <Fade key="menu-maximized" in={!state.minimized}>
                                            <MinimizeIcon fontSize="small" />
                                          </Fade>
                                        </span>
                                      )}
                                    </IconButton>
                                  </Tooltip>
                                )}

                                {onClose ? (
                                  <Tooltip title={open ? `Close ${title}` : ''}>
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
                                      size="small"
                                    >
                                      <CloseIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                ) : null}
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
                            {typeof children === 'function'
                              ? children({
                                  height: state.dimensions.height - 31,
                                  width: state.dimensions.width,
                                })
                              : children}
                          </div>
                        </div>
                      </div>
                    </ResizeContainer>
                  </Card>
                </div>
              </DragContainer>
            </div>
          </Fade>
        </div>
      </EventBoundary>,

      PORTAL
    )
  }
)
