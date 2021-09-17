import LinearProgress from '@material-ui/core/LinearProgress'

export default ({ style = {} }) => (
  <LinearProgress style={{ position: 'absolute', left: 0, right: 0, zIndex: 1099, ...style }} />
)
