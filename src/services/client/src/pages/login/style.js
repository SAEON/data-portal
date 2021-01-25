import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  grid: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(12),
  },
  card: {
    backgroundColor: fade(theme.palette.common.white, 0.75),
    paddingBottom: theme.spacing(1),
  },
  button: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  confirmPassword: {
    marginBottom: theme.spacing(2),
  },
  divider: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(4),
  },
  box: {
    display: 'flex',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(1),
  },
  formLabel: {
    fontSize: '12px',
  },
  header: {
    textAlign: 'center',
  },
  notMobile: {
    margin: '0 25%',
  },
  mobile: {
    padding: '20px',
  },
}))
