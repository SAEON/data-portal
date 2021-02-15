import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  sortList: {
    borderTop: `1px solid ${theme.palette.grey[200]}`,
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
    marginTop: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  'record-card': {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.palette.grey[100],
    },
  },
  isSelected: {
    backgroundColor: theme.palette.grey[100],
  },
}))
