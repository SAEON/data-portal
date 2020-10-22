import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  input: {
    color: theme.palette.common.white,
    padding: 32,
    caretColor: theme.palette.common.white,
  },
  recordSearchBox: {
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    transitionDuration: theme.transitions.duration.standard,
    transitionProperty: 'background-color',

    // When not hovered, not active
    '& .MuiInput-underline:before': {
      borderBottom: 'none',
    },
    // When hovered
    '&:hover': {
      backgroundColor: fade(theme.palette.secondary.main, 0.1),
    },
    '& .MuiInput-underline:hover:before': {
      border: 'none',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.secondary.main,
    },
  },
  divider: {
    backgroundColor: theme.palette.secondary.main,
  },
  toolbar: {
    backgroundColor: fade(theme.palette.common.black, 0.4),
    minHeight: theme.customSizes.thickToolbar.minHeight,
  },
}))
