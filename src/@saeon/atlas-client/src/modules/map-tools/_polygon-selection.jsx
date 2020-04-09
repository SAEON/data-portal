import React, { useEffect } from 'react'
import { DragMenu, Form } from '../../components'
import { MenuContext } from '../menu-provider'
import { MapContext } from '../map-provider'
import { IconButton, Tooltip } from '@material-ui/core'
import { Gesture as GestureIcon, CropSquare as SquareIcon } from '@material-ui/icons'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Draw, { createBox } from 'ol/interaction/Draw'
import { nanoid } from 'nanoid'

var draw
export default ({ id, onClose, onDrawEnd }) => {
  return (
    <Form selectPolygonActic={false} selectRectActive={false}>
      {({ updateForm, selectPolygonActic, selectRectActive }) => (
        <MapContext.Consumer>
          {({ proxy }) => {
            return (
              <MenuContext.Consumer>
                {({ getMenuById, setActiveMenu }) => (
                  <DragMenu
                    onMouseDown={() => setActiveMenu(id)}
                    zIndex={getMenuById(id).zIndex}
                    defaultPosition={{ x: 150, y: 25 }}
                    defaultWidth={60}
                    defaultHeight={143}
                    title={''}
                    resizable={false}
                    close={onClose}
                  >
                    {() => {
                      const keyDown = (e) => {
                        if (e.key === 'Escape') {
                          proxy.removeInteraction(draw)
                          updateForm({
                            selectRectActive: false,
                            selectPolygonActic: false,
                          })
                        }
                      }

                      useEffect(() => {
                        const body = document.getElementsByTagName('body')[0]
                        body.addEventListener('keydown', keyDown)
                        return () => body.removeEventListener('keydown', keyDown)
                      }, [])
                      return (
                        <>
                          <div>
                            <Tooltip placement="right" title="Selected rectangle">
                              <IconButton
                                style={{ padding: 0 }}
                                color={selectRectActive ? 'secondary' : 'default'}
                                aria-label="select-rectangle"
                                onClick={() => {
                                  proxy.removeInteraction(draw)
                                  if (!selectRectActive) {
                                    const source = new VectorSource({ wrapX: false })
                                    const layer = new VectorLayer({
                                      id: `${nanoid()}-drawLayer`,
                                      title: 'Draw layer',
                                      source,
                                    })
                                    draw = new Draw({
                                      source: source,
                                      type: 'Circle',
                                      geometryFunction: createBox(),
                                    })
                                    proxy.addInteraction(draw)
                                    draw.on('drawend', (event) => {
                                      const feat = event.feature
                                      const geometry = feat.getGeometry()
                                      onDrawEnd(geometry)
                                    })
                                    proxy.addLayer(layer)
                                  }
                                  updateForm({
                                    selectRectActive: !selectRectActive,
                                    selectPolygonActic: false,
                                  })
                                }}
                              >
                                <SquareIcon fontSize="default" />
                              </IconButton>
                            </Tooltip>
                          </div>
                          <div style={{ marginTop: 16 }}>
                            <Tooltip placement="right" title="Select polygon">
                              <IconButton
                                onClick={() => {
                                  proxy.removeInteraction(draw)
                                  if (!selectPolygonActic) {
                                    const source = new VectorSource({ wrapX: false })
                                    const layer = new VectorLayer({
                                      id: `${nanoid()}-drawLayer`,
                                      title: 'Draw layer',
                                      source,
                                    })
                                    draw = new Draw({
                                      source: source,
                                      type: 'Polygon',
                                      freehand: true,
                                    })
                                    proxy.addInteraction(draw)
                                    draw.on('drawend', (event) => {
                                      const feat = event.feature
                                      const geometry = feat.getGeometry()
                                      onDrawEnd(geometry)
                                    })
                                    proxy.addLayer(layer)
                                  }
                                  updateForm({
                                    selectPolygonActic: !selectPolygonActic,
                                    selectRectActive: false,
                                  })
                                }}
                                style={{ padding: 0 }}
                                color={selectPolygonActic ? 'secondary' : 'default'}
                                aria-label="select-polygon"
                              >
                                <GestureIcon fontSize="default" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </>
                      )
                    }}
                  </DragMenu>
                )}
              </MenuContext.Consumer>
            )
          }}
        </MapContext.Consumer>
      )}
    </Form>
  )
}
