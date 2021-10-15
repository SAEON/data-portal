import Badge from '@mui/material/Badge'
import withStyles from '@mui/styles/withStyles'

export default withStyles(() => ({
  badge: ({ right = -3, top = 3, opacity = 0.8 }) => {
    return {
      right,
      top,
      opacity,
      fontSize: '0.6rem',
    }
  },
}))(Badge)
