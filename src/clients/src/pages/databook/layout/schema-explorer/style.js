import makeStyles from '@mui/styles/makeStyles';

export default makeStyles(theme => ({
  layout: {
    padding: '4px 0 0 4px',
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  ulReset: { margin: 'unset', paddingLeft: 15 },
  liReset: {
    listStyleType: 'none',
  },
  icon: {
    float: 'left',
  },
  hover: {
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
  monoText: {
    paddingLeft: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
  },
  secondaryText: {
    color: theme.palette.grey[300],
    paddingLeft: '5px',
    fontFamily: 'monospace',
    fontSize: 'small',
    float: 'right',
    alignSelf: 'center',
  },
  button: {},
  hidden: { visibility: 'hidden', height: '0' },
}))
