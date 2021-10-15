import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.grey[100],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}))
