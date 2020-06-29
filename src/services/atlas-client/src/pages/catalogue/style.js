import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    height: `calc(100% - 72px)`, // TODO - should tie in with theme
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
