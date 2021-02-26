import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  link: { ...theme.link, '&:hover': { ...theme.linkActive } },
}))
