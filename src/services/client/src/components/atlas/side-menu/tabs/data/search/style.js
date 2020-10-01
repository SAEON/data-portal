import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  sortList: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    paddingTop: 16,
    paddingBottom: 16,
  },
  'record-card': {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  isSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    // border: '1px solid rgba(0, 0, 0, 0.2)',
  },
}))
