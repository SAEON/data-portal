import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
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

  toolbar: {
    backgroundColor: theme.palette.grey[200],
    minHeight: theme.customSizes.thickToolbar.minHeight,
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
