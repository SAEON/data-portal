import { makeStyles } from '@material-ui/core/styles'
import { alpha } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    border: `1px solid ${alpha(theme.palette.common.white, 0.5)}`,
    '&:hover': {
      border: 'none',
    },
    transition: 'all',
    transitionDuration: theme.transitions.duration.standard,
  },
  image: {
    position: 'relative',
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        outline: '1px solid currentColor',
      },
    },
    transition: 'all',
    transitionDuration: theme.transitions.duration.standard,
  },
  imageButton: {
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
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
  },
  imageMarked: {},
}))
