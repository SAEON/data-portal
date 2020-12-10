import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  gridItem: {
    margin: 4,
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  grid: {},
  box: {
    height: 'calc(100% - 48px)',
    // border: `1px solid ${theme.palette.grey[500]}`,
  },
}))
