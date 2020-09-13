import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

export default makeStyles(theme => ({
  appBar: {
    backgroundColor: theme.palette.primary.main,
    width: '100%',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    minHeight: 49,
  },
  content: {
    height: `calc(100% - ${49}px)`,
    position: 'relative',
  },
}))
