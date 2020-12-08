import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  gridRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30, // TODO should be ROW_HEIGHT
  },
  dragHandleIcon: {
    // paddingLeft: 1,
    // paddingRight: 1,
    backgroundColor: theme.palette.grey[100],
    position: 'absolute',
    right: 0,
    cursor: 'col-resize',
    zIndex: 2,
    fontSize: 'large',
  },
  tableRow: {
    lineHeight: '30px',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    display: 'relative',
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
  tableRowHovered: {
    backgroundColor: theme.palette.grey[100],
  },
  headerRow: {
    lineHeight: '30px',
    backgroundColor: theme.palette.grey[100],
    justifyContent: 'space-between',
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    fontWeight: 'bold',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    fontFamily: 'monospace',
  },
  gridItem: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'monospace',
  },
  TEST: {
    marginRight: '10px',
    textOverflow: 'ellipsis' /*width: '-webkit-fill-available'*/,
  },
}))
