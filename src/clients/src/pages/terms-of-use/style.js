import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  card: {
    backgroundColor: theme.backgroundColor,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  h2: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  body: {
    marginBottom: theme.spacing(2),
  },
}))
