import { fade, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  root: {},
  expanded: {},
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
    marginRight: '5px',
  },
  renamingText: {
    fontFamily: 'monospace',
    fontSize: 'small',
    padding: '5px',
    paddingLeft: '0px',
  },
  secondaryText: {
    color: fade(theme.palette.common.black, 0.4),
    paddingLeft: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
    float: 'right',
  },
  button: {},
  hidden: { visibility: 'hidden', height: '0' },
}))
