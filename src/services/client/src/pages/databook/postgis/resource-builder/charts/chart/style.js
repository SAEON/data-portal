import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  toolbar: {
    backgroundColor: theme.palette.grey[100],
    borderBottom: `1px solid ${theme.palette.grey[200]}`,
  },
  split: { display: 'flex' },
  splitItem: {
    display: 'inline-block',
    overflowY: 'auto',
    overflowX: 'hidden',
  },
}))
