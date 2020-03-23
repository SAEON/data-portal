import React from 'react'
import { DragMenu } from '../../components'
import { Typography } from '@material-ui/core'

export default ({ layer, onClose }) => {
  const InfoMenu =
    layer.get('InfoMenu') ||
    (() => (
      <div style={{ marginBottom: 10 }}>
        <Typography>No component specified for {layer.get('title')}</Typography>
      </div>
    ))
  return (
    <DragMenu
      onMouseDown={() => console.log('update zIndex todo')}
      zIndex={99}
      defaultPosition={{ x: 650, y: 25 }}
      width={200}
      title={'Layer info'}
      active={true}
      close={onClose}
    >
      <InfoMenu />
    </DragMenu>
  )
}
