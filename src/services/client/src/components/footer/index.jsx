import { AppBar, Toolbar, Typography } from '@material-ui/core'

export default () => {
  return (
    <div style={{ position: 'relative' }}>
      <AppBar
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
        }}
        position="relative"
        color="primary"
      >
        <Toolbar variant="dense">
          <Typography variant="overline">© SAEON 2020 - {new Date().getFullYear()}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  )
}
