import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.grey[200],
    minHeight: theme.customSizes.thickToolbar.minHeight,
  },
}))
