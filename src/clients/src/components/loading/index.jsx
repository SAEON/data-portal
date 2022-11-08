import LinearProgress from '@mui/material/LinearProgress'

export default ({ sx = {}, style = {}, withHeight = false }) => {
  if (withHeight) {
    return (
      <div style={{ height: 1000 }}>
        <LinearProgress
          sx={{ position: 'absolute', left: 0, right: 0, zIndex: 1099, ...sx }}
          style={style}
        />
      </div>
    )
  }

  return (
    <LinearProgress
      sx={{ position: 'absolute', left: 0, right: 0, zIndex: 1099, ...sx }}
      style={style}
    />
  )
}
