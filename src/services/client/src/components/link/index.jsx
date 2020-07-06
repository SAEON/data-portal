import React from 'react'
import useStyles from './style'

export default ({ uri, name = null }) => {
  const classes = useStyles()
  return (
    <a target="_blank" rel="noopener noreferrer" className={classes.link} href={uri}>
      {name || uri}
    </a>
  )
}
