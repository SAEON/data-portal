import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  card: {
    backgroundColor: theme.backgroundColor,
    padding: theme.spacing(3),
    width: '100%',
  },
  notMobile: {
    ...theme.notMobile,
  },
  mobile: {
    ...theme.mobile,
  },
}))
