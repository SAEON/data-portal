import React from 'react'
import { DragMenu, Form } from '../../components'
import { MenuContext } from '../menu-provider'
import { IconButton, Tooltip } from '@material-ui/core'
import { Gesture as GestureIcon, CropSquare as SquareIcon } from '@material-ui/icons'

export default ({ id, onClose }) => {
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
          {() => (
            <Form selectPolygonActic={false} selectRectActive={false}>
              {({ updateForm, selectPolygonActic, selectRectActive }) => (
                <>
                  <div>
                    <Tooltip placement="right" title="Selected rectangle">
                      <IconButton
                        style={{ padding: 0 }}
                        color={selectRectActive ? 'secondary' : 'default'}
                        aria-label="select-rectangle"
                        onClick={() =>
                          updateForm({
                            selectRectActive: !selectRectActive,
                            selectPolygonActic: false,
                          })
                        }
                      >
                        <SquareIcon fontSize="default" />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <Tooltip placement="right" title="Select polygon">
                      <IconButton
                        onClick={() =>
                          updateForm({
                            selectPolygonActic: !selectPolygonActic,
                            selectRectActive: false,
                          })
                        }
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
          )}
        </DragMenu>
      )}
    </MenuContext.Consumer>
  )
}
