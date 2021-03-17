import makeStyles from '@material-ui/core/styles/makeStyles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  layout: {
    height: '100%',
    display: 'flex',
    padding: 16,
    backgroundColor: fade(theme.palette.secondary.light, 0.1),
  },
  item: {
    display: 'flex',
    margin: 'auto',
  },
}))
