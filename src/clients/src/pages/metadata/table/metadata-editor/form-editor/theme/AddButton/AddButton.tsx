import React from 'react'

import { AddButtonProps } from '@rjsf/core'

import IconButton from '@mui/material/IconButton'
import AddIcon from 'mdi-react/AddCircleIcon'

const AddButton: React.FC<AddButtonProps> = props => {
  const { ...props2 } = props

  return (
    <IconButton size="small" color="primary" {...props2}>
      <AddIcon size={18} />
    </IconButton>
  )
}

export default AddButton
