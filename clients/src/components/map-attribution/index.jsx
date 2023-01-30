import Typography from '@mui/material/Typography'
import { alpha } from '@mui/material/styles'

export default ({ sx }) => (
  <Typography
    variant="caption"
    sx={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      zIndex: 1,
      lineHeight: 'unset',
      backgroundColor: theme => alpha(theme.palette.common.white, 0.8),
      m: 0,
      py: 0,
      px: theme => theme.spacing(0.5),
      ...sx,
    }}
  >
    Powered by Esri
  </Typography>
)
