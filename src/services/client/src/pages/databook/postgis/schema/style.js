import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    padding: '4px 0 0 4px',
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
  inputField: {
    background: 'none',
    border: 'none',
    outline: 'none',
    fontFamily: 'monospace',
    fontSize: 'small',
    padding: '5px',
    marginRight: '-5px',
    '&:focus': {
      outline: `1px solid ${theme.palette.grey[200]}`,
    },
  },
  inputFieldActive: {
    outline: `1px solid ${theme.palette.grey[500]} !important`,
  },
  secondaryText: {
    color: fade(theme.palette.common.black, 0.4),
    paddingLeft: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
    float: 'right',
    alignSelf: 'center',
  },
  button: {},
  hidden: { visibility: 'hidden', height: '0' },
}))
