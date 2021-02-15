import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  filter: {
    display: 'flex',
    borderRadius: '3px',
    backgroundColor: theme.palette.secondary.light,
    margin: '5px',
    alignItems: 'center',
    paddingLeft: '6px',
  },
}))
