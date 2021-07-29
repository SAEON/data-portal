import AppBar from '@material-ui/core/AppBar'
import { cloneElement } from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'

const AnimateVariant = ({ children }) =>
  cloneElement(children, {
    variant: useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    })
      ? 'regular'
      : 'dense',
  })

export default ({ children, style, ...props }) => {
  return (
    <AppBar color="inherit" variant="outlined" position="sticky" {...props}>
      <AnimateVariant>
        <Toolbar
          disableGutters
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            transition: 'min-height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ...style,
          }}
        >
          {children}
        </Toolbar>
      </AnimateVariant>
    </AppBar>
  )
}
