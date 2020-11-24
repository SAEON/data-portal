import { fade, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  icon: { marginBottom: -6, marginRight: 0, marginLeft: -6 },
  text: {
    fontFamily: 'monospace',
    fontSize: 'small',
    border: 'none',
    outline: 'none',
  },
  secondaryText: {
    color: fade(theme.palette.common.black, 0.4),
    paddingLeft: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
  },
  renamingText: {
    padding: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
  },

  hidden: { visibility: 'hidden', height: '0' },
}))
