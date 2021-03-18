import makeStyles from '@material-ui/core/styles/makeStyles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  layout: {
    height: '100%',
    backgroundColor: fade(theme.palette.secondary.light, 0.1),
    position: 'relative',
    overflow: 'hidden',
  },
  toolbar: {
    backgroundColor: theme.palette.primary.light,
    minHeight: 32,
    color: theme.palette.primary.contrastText,
  },
  item: {
    display: 'flex',
    margin: 'auto',
  },
}))
