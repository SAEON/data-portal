import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    backgroundColor: fade(theme.palette.common.white, 0.8),
    margin: theme.spacing(1),
  },
  gridContainer: {},
  grid: {},
  gridItem: {},
  gridItemContent: {},
  item: {
    display: 'block',
    position: 'absolute',
    top: theme.spacing(1),
    bottom: theme.spacing(1),
    left: theme.spacing(1),
    right: theme.spacing(1),
    backgroundColor: fade(theme.palette.common.white, 0.8),
  },
}))
