import { fade, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  root: {
    position: 'relative',
    height: `calc(100%)`, // TODO - should tie in with theme
    width: '100%',
  },
  grid: {
    height: '100%',
  },
  padding: {
    padding: 16,
  },
  resultsGrid: {
    height: `calc(100% - 52px)`, // TODO - should tie in with the theme
  },
  catalogueContainer: {
    height: `calc(100% - 110px)`, // TODO - should tie in with the theme
    position: 'relative',
  },
  scrollContainer: {
    height: '100%',
    overflow: 'auto',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  toolbar: {
    backgroundColor: theme.palette.grey[200],
    minHeight: theme.customSizes.thickToolbar.minHeight,
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  textField: {
    borderRadius: theme.shape.borderRadius,
    '& input': {
      color: theme.palette.text,
    },
    '& div': {
      padding: 0,
    },
  },
}))
