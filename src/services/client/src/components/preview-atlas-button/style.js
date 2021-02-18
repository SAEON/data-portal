import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  errorBlock: {
    backgroundColor: theme.palette.grey[100],
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.grey[200]}`,
    whiteSpace: 'break-spaces',
    padding: theme.spacing(1),
  },
}))
