import { makeStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    border: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
    '&:hover': {
      border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
    },
    transition: theme.transitions.create('border'),
  },
  button: {
    position: 'relative',
    '&:hover': {
      '& $bg': {
        opacity: 0.15,
      },
      '& $title': {
        border: '1px solid currentColor',
        color: alpha(theme.palette.common.white, 0.8),
      },
    },
  },
  buttonTitle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  bg: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.5,
    transition: theme.transitions.create('opacity'),
  },
  title: {
    color: alpha(theme.palette.common.white, 1),
    border: `1px solid ${alpha(theme.palette.common.white, 0)}`,
    transition: theme.transitions.create(['border', 'color']),
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
}))
