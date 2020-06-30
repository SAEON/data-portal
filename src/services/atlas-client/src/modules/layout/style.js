// import { makeStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    height: 'calc(100% - 72px)', // TODO - this should be dynamic and tied to the theme
  },
  root: {
    flexGrow: 1,
  },
  link: {},
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))
