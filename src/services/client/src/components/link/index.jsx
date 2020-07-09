import React, { forwardRef } from 'react'
import useStyles from './style'

export default forwardRef(({ uri, name = null, children = null }, ref) => {
  const classes = useStyles()
  return (
    <a ref={ref} target="_blank" rel="noopener noreferrer" className={classes.link} href={uri}>
      {children || name || uri}
    </a>
  )
})
