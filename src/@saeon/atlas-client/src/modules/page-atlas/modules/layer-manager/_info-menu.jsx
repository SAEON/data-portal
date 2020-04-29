import React from 'react'
import { Typography } from '@material-ui/core'
import { DragMenu } from '@saeon/snap-menus'
import { isMobile } from 'react-device-detect'

// TODO - onClose ?
// eslint-disable-next-line no-unused-vars
export default ({ id, layer, onClose }) => {
  const InfoMenu =
    layer.get('InfoMenu') ||
    (() => (
      <div style={{ marginBottom: 10 }}>
        <Typography>No component specified for {layer.get('title')}</Typography>
      </div>
    ))

  return (
    <DragMenu
      id={id}
      defaultPosition={{ x: 650, y: 25 }}
      defaultWidth={230}
      title={'Layer info'}
      fullscreen={isMobile}
    >
      {() => <InfoMenu />}
    </DragMenu>
  )
}
