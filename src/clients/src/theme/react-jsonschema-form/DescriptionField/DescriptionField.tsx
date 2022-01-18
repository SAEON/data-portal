import React from 'react'

import { FieldProps } from '@rjsf/core'
import Typography from '@mui/material/Typography'

const DescriptionField = ({ description }: FieldProps) => {
  if (description) {
    return (
      <Typography
        variant="caption"
        sx={{
          marginTop: 5,
        }}
      >
        {description}
      </Typography>
    )
  }

  return null
}

export default DescriptionField
