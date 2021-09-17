import makeStyles from '@material-ui/core/styles/makeStyles'
import { alpha } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  input: {
    color: theme.palette.common.white,
    padding: `${theme.spacing(4)}px 0`,
    caretColor: theme.palette.common.white,
  },
  recordsSearchBox: {
    transition: theme.transitions.create('background-color'),
    backgroundColor: alpha(theme.palette.common.white, 0.1),

    // When not hovered, not active
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    // When hovered
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.2),
    },
    '& .MuiInput-underline:hover:before': {
      border: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: alpha(theme.palette.common.white, 0.5),
    },
  },
  divider: {
    backgroundColor: theme.palette.common.white,
  },
}))
