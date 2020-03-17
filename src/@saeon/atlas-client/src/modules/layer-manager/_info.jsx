import React from 'react'
import { DragMenu } from '../../components'
import { Typography } from '@material-ui/core'

export default ({ title, onClose }) => {
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
      <Typography>{title}</Typography>
    </DragMenu>
  )
}
