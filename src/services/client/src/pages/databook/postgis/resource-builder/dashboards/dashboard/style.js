import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.grey[100],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  gridContainer: {
    height: 'calc(100% - 48px)',
    position: 'relative',
    padding: 8,
  },
  grid: {
    height: '100% !important', // Overides the gridstack height
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  gridItem: {},
  gridItemContent: {
    border: `1px solid ${theme.palette.grey[300]}`,
  },
}))
