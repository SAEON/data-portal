import { AppBar, Toolbar, Typography, IconButton, SwipeableDrawer } from '@material-ui/core'
import { Close as CloseButton } from '@material-ui/icons'

export default ({ open, toggle, title, children, width, height, anchor = 'left' }) => {
  return (
    <SwipeableDrawer
      onOpen={() => null}
      anchor={anchor}
      variant="persistent"
      open={open}
      onClose={toggle}
    >
      <div style={{ width: width || 400, height: height || '100%' }}>
        <AppBar variant="outlined" color="secondary" position="relative">
          {title ? (
            <Toolbar disableGutters={true}>
              <div style={{ padding: 20, width: '100%' }}>
                <Typography variant="overline">{title}</Typography>
                <IconButton
                  onClick={() => toggle({ active: false })}
                  color="inherit"
                  edge="end"
                  style={{ float: 'right', order: 2, marginLeft: 'auto', padding: '0 2px' }}
                  aria-label="close"
                >
                  <CloseButton />
                </IconButton>
              </div>
            </Toolbar>
          ) : null}
        </AppBar>
        <div style={{ padding: '20px 10px', height: '100%' }}>{children}</div>
      </div>
    </SwipeableDrawer>
  )
}
