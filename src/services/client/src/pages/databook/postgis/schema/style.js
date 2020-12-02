import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    padding: '3px',
    height: '100%',
    overflow: 'auto',
  },
  ulReset: { margin: 'unset', paddingLeft: 15 },
  liReset: {
    listStyleType: 'none',
  },
  icon: {
    float: 'left',
  },
  hoverHighlight: {
    listStyleType: 'none',
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
