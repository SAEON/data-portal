import { Badge } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

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
