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
    cursor: 'col-resize',
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
  },
}))
