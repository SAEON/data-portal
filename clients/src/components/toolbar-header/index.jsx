import AppBar from '@mui/material/AppBar'
import { cloneElement } from 'react'
import Toolbar from '@mui/material/Toolbar'
import useScrollTrigger from '@mui/material/useScrollTrigger'

const AnimateVariant = ({ children }) =>
  cloneElement(children, {
    variant: useScrollTrigger({
      disableHysteresis: true,
      threshold: location.pathname === '/' ? 0 : 2,
    })
      ? 'regular'
      : 'dense',
  })

export default ({ children, style, sx, ...props }) => {
  sx = sx || style
  return (
    <AppBar color="inherit" variant="outlined" elevation={0} position="sticky" {...props}>
      <AnimateVariant>
        <Toolbar
          disableGutters
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            transition: 'min-height 300ms cubic-bezier(0.4, 0, 0.2, 1)',
            ...sx,
          }}
        >
          {children}
        </Toolbar>
      </AnimateVariant>
    </AppBar>
  )
}
