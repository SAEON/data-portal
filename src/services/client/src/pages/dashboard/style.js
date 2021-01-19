import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    backgroundColor: fade(theme.palette.common.white, 0.8),
    margin: theme.spacing(1),
  },
  gridContainer: {},
  grid: {},
  gridItem: {},
  gridItemContent: {},
  item: {
    display: 'block',
    position: 'absolute',
    top: theme.spacing(1),
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.white, 0.8),
  },
  //steven. below possibly deletable at some point
  button: {
    margin: theme.spacing(1),
    width: '150px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '6px',
    justifyContent: 'space-between',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  select: {
    color: 'white',
  },
  formControl: {
    margin: theme.spacing(1),
    width: '150px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderRadius: '6px',
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
  },
  icon: { color: 'white' },
  test: {
    borderColor: 'red',
    '& label.MuiFocused': {
      color: 'secondary',
    },
  },
}))
