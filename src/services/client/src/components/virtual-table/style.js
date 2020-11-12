import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  gridRoot: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  dragHandleIcon: {
    cursor: 'col-resize',
  },
  headerRow: {
    lineHeight: '30px',
    backgroundColor: '#f4f4f4',
    justifyContent: 'space-between',
    borderBottom: '1px solid #CCC',
    display: 'flex',
    fontWeight: 'bold',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
  },
}))
