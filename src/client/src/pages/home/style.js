import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  card: {
    backgroundColor: theme.backgroundColor,
    padding: theme.spacing(3),
  },
  mdAndUp: {
    margin: `0 ${theme.spacing(16)}px`,
  },
  mdAndDown: {},
}))
