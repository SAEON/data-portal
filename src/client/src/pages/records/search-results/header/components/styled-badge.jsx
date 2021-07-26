import Badge from '@material-ui/core/Badge'
import withStyles from '@material-ui/core/styles/withStyles'

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
