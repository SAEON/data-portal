import React from 'react'
import { Typography } from '@material-ui/core'
import { MenuContext, DragMenu } from '@saeon/snap-menus'
import { isMobile } from 'react-device-detect'

export default ({ id, layer, onClose }) => {
  const LegendMenu =
    layer.get('LegendMenu') ||
    (() => (
      <div style={{ marginBottom: 10 }}>
        <Typography>No component specified for {layer.get('title')}</Typography>
      </div>
    ))

  return (
    <MenuContext.Consumer>
      {({ getMenuById, setActiveMenu }) => (
        <DragMenu
          onMouseDown={() => setActiveMenu(id)}
          zIndex={getMenuById(id).zIndex}
          defaultPosition={{ x: 650, y: 25 }}
          defaultWidth={200}
          title={'Legend'}
          active={true}
          close={onClose}
          fullscreen={isMobile}
        >
          {() => <LegendMenu />}
        </DragMenu>
      )}
    </MenuContext.Consumer>
  )
}
