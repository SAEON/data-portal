import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  layout: {
    backgroundColor: theme.backgroundColor,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}))
