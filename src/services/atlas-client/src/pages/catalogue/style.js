import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {
    flexGrow: 1,
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
