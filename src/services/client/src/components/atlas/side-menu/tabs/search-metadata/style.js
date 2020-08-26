import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  'record-card': {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    border: '1px solid rgba(0, 0, 0, 0.12)',
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
    },
  },
  isSelected: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.2)',
  },
}))
