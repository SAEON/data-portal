import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  grid: {
    backgroundColor: theme.backgroundColor,
    padding: 16,
  },
  notMobile: {
    margin: '0 25%',
  },
  mobile: {
    padding: '20px',
  },
}))
