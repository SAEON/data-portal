import React from 'react'
import { Typography } from '@material-ui/core'

export default ({ error, loading, ...props }) => {
  console.log(error)
  return (
    <Typography {...props} variant="overline" noWrap>
      <div>{error ? 'An error has occurred' : loading}</div>
    </Typography>
  )
}
