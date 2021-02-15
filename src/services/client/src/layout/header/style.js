import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
    border: 'none',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    minHeight: 48,
  },
}))
