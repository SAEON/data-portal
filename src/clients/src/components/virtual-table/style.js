import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  gridRoot: ({ ROW_HEIGHT }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: ROW_HEIGHT,
  }),
  dragHandleIcon: {
    backgroundColor: theme.palette.common.white, //theme.palette.grey[100],
    // border: '1px dotted',
    color: 'rgba(0, 0, 0, 0.5)',
    // color: theme.palette.grey[600],
    position: 'absolute',
    right: 0,
    height: '100%',
    // paddingLeft: 1,
    // paddingRight: 1,
    zIndex: 2,
    cursor: 'col-resize',
    // fontSize: 'large',
  },
  tableRow: ({ ROW_HEIGHT }) => ({
    lineHeight: `${ROW_HEIGHT}px`, //'40px', //'30px',
    // fontSize: '15px',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    display: 'relative',
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid #dddddd`,
    overflow: 'hidden',
  }),
  tableRowAlternate: {
    backgroundColor: '#f9f9f9 !important', // theme.palette.grey[100] + ' !important',
  },
  headerRow: ({ _, HEADER_HEIGHT }) => ({
    lineHeight: `${HEADER_HEIGHT}px`, //30px
    // color: theme.palette.grey[600],
    // fontSize: '15px',
    backgroundColor: theme.palette.common.white, //theme.palette.grey[100],
    justifyContent: 'space-between',
    borderBottom: '1px solid #111111', //`1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    fontWeight: 'bold',
    paddingLeft: '.5rem',
    paddingRight: '.5rem',
    fontFamily: 'monospace',
  }),
  gridItem: {
    overflowX: 'hidden',
    textOverflow: 'ellipsis',
    fontFamily: 'monospace',
  },
}))
