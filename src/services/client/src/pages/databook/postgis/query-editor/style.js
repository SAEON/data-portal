import { makeStyles } from '@material-ui/core/styles'
import { deepOrange } from '@material-ui/core/colors'

export default makeStyles(theme => ({
  layout: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  bg: {
    backgroundColor: theme.palette.common.white,
  },
  toolbar: {
    backgroundColor: theme.palette.grey[100],
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    justifyContent: 'flex-start',
  },
  smallAvatar: {
    width: theme.spacing(2),
    height: theme.spacing(2),
    fontSize: 10,
    backgroundColor: deepOrange[500],
  },
  playButton: {
    marginLeft: 'auto',
    marginRight: theme.spacing(1),
  },
  tab: {
    minWidth: 30,
  },
}))
