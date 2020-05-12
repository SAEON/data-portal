import React from 'react'
import { Typography } from '@material-ui/core'
import { DragMenu } from '@saeon/snap-menus'
import { isMobile } from 'react-device-detect'

export default ({ id, layer }) => {
  const LegendMenu =
    layer.get('LegendMenu') ||
    (() => (
      <div style={{ marginBottom: 10 }}>
        <Typography>No component specified for {layer.get('title')}</Typography>
      </div>
    ))

  return (
    <DragMenu
      id={id}
      defaultPosition={{ x: 650, y: 25 }}
      defaultWidth={200}
      title={'Legend'}
      fullscreen={isMobile}
    >
      {() => <LegendMenu />}
    </DragMenu>
  )
}
