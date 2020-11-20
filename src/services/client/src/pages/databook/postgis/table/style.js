import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  content: {
    position: 'relative',
    height: 'calc(100% - 48px)',
  },
  bg: {
    backgroundColor: theme.palette.common.white,
  },
}))
