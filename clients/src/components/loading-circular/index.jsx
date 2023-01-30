import CircularProgress from '@mui/material/CircularProgress'

export default ({ sx, ...props }) => (
  <CircularProgress thickness={2} size={18} sx={{ margin: '0 6px', ...sx }} {...props} />
)
