import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  toolbar: {
    color: theme.palette.secondary.contrastText,
  },
  appbar: {
    backgroundColor: theme.palette.common.white,
    zIndex: 800,
  },
}))
