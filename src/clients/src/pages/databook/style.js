import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  layout: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pre: Object.fromEntries(
    Object.entries({
      backgroundColor: theme.palette.grey[100],
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.grey[200]}`,
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all',
      padding: theme.spacing(1),
    }).filter(([key]) => key !== 'backgroundColor')
  ),

  toolbar: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    display: 'flex',
    justifyContent: 'flex-start',
    boxSizing: 'content-box',
  },

  content: {
    position: 'relative',
    height: '100%',
  },

  playButton: {
    marginRight: theme.spacing(1),
  },
  msgBox: {
    padding: theme.spacing(1),
    fontFamily: 'monospace',
  },
}))
