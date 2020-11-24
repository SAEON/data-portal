import { fade, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  icon: {
    float: 'left',
  },
  schemaIcon: {
    '&:hover': {
      background: '#efefef',
    },
  },
  hoverHighlight: {
    '&:hover': {
      background: '#efefef',
    },
  },
  text: {
    fontFamily: 'monospace',
    fontSize: 'small',
    background: 'none',
    border: 'none',
    outline: 'none',
  },
  secondaryText: {
    color: fade(theme.palette.common.black, 0.4),
    paddingLeft: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
    float: 'right',
  },
  renamingText: {
    padding: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
  },
  button: {},
  hidden: { visibility: 'hidden', height: '0' },
}))
