import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.grey[100],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  gridContainer: {
    height: 'calc(100% - 64px)',
    position: 'relative',
    padding: theme.spacing(1),
    marginLeft: theme.spacing(4),
    marginRight: theme.spacing(4),
    border: `1px solid ${theme.palette.grey[200]}`,
    boxSizing: 'border-box',
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
