import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => {
  return {
    card: {
      backgroundColor: fade(theme.palette.common.white, 0.85),
    },
  }
})
