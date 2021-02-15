import makeStyles from '@material-ui/core/styles/makeStyles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  card: {
    backgroundColor: fade(theme.palette.common.white, 0.75),
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  body: {
    marginBottom: theme.spacing(2),
  },
}))
