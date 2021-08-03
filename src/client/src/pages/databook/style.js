import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  layout: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pre: Object.fromEntries(Object.entries(theme.pre).filter(([key]) => key !== 'backgroundColor')),

  toolbar: {
    backgroundColor: theme.palette.secondary.light,
    borderBottom: `1px solid ${theme.palette.secondary.dark}`,
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
  saveButton: {
    marginLeft: 'auto',
  },
  msgBox: {
    padding: theme.spacing(1),
    fontFamily: 'monospace',
  },
}))
