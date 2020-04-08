import React, { useEffect } from 'react'
import { DragMenu, Form } from '../../components'
import { MenuContext } from '../menu-provider'
import { MapContext } from '../map-provider'
import { IconButton, Tooltip } from '@material-ui/core'
import { Gesture as GestureIcon, CropSquare as SquareIcon } from '@material-ui/icons'
import { Vector as VectorLayer } from 'ol/layer'
import { Vector as VectorSource } from 'ol/source'
import Draw, { createBox } from 'ol/interaction/Draw'

var draw
const source = new VectorSource({ wrapX: false })
const layer = new VectorLayer({
  id: 'drawLayer',
  title: 'Draw layer',
  source,
})

export default ({ id, onClose, onDrawEnd }) => {
  return (
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
                  useEffect(() => {
                    proxy.addLayer(layer)
                    return () => proxy.removeLayer(layer)
                  }, [])
                  return (
                    <Form selectPolygonActic={false} selectRectActive={false}>
                      {({ updateForm, selectPolygonActic, selectRectActive }) => (
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
                      )}
                    </Form>
                  )
                }}
              </DragMenu>
            )}
          </MenuContext.Consumer>
        )
      }}
    </MapContext.Consumer>
  )
}
