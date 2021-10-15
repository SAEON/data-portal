import LinearProgress from '@mui/material/LinearProgress'

export default ({ style = {}, withHeight = false }) => {
  if (withHeight) {
    return (
      <div style={{ height: 1000 }}>
        <LinearProgress
          style={{ position: 'absolute', left: 0, right: 0, zIndex: 1099, ...style }}
        />
      </div>
    )
  }

  return (
    <LinearProgress style={{ position: 'absolute', left: 0, right: 0, zIndex: 1099, ...style }} />
  )
}
