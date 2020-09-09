import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.secondary.light,
    minHeight: theme.customSizes.thickToolbar.minHeight,
  },
}))
