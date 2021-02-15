import makeStyles from '@material-ui/core/styles/makeStyles'
import { fade } from '@material-ui/core/styles/colorManipulator'
export default makeStyles(theme => ({
  grid: {
    backgroundColor: fade(theme.palette.common.white, 0.75),
    padding: 16,
  },
  notMobile: {
    margin: '0 25%',
  },
  mobile: {
    padding: '20px',
  },
}))
