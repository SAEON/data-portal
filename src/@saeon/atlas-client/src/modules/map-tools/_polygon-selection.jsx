import React from 'react'
import { DragMenu } from '../../components'
import { MenuContext } from '../menu-provider'
import { IconButton, Grid, Tooltip } from '@material-ui/core'
import { Gesture as GestureIcon, CropSquare as SquareIcon } from '@material-ui/icons'

export default ({ id, onClose, data }) => {
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
            <>
              <div>
                <Tooltip placement="right" title="Selected rectangle">
                  <IconButton
                    style={{ padding: 0 }}
                    color="secondary"
                    aria-label="select-rectangle"
                  >
                    <SquareIcon fontSize="default" />
                  </IconButton>
                </Tooltip>
              </div>
              <div style={{ marginTop: 16 }}>
                <Tooltip placement="right" title="Select polygon">
                  <IconButton style={{ padding: 0 }} color="secondary" aria-label="select-polygon">
                    <GestureIcon fontSize="default" />
                  </IconButton>
                </Tooltip>
              </div>
            </>
          )}
        </DragMenu>
      )}
    </MenuContext.Consumer>
  )
}
