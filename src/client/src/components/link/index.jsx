import { forwardRef } from 'react'
import useStyles from './style'

export default forwardRef(
  ({ uri, download = null, name = null, children = null, ...props }, ref) => {
    const classes = useStyles()
    return (
      <a
        ref={ref}
        download={download}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.link}
        href={uri}
        {...props}
      >
        {children || name || uri}
      </a>
    )
  }
)
