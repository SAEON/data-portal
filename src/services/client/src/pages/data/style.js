import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  root: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: fade(theme.palette.common.white, 0.5),
  },
  toolbar: {
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
}))
