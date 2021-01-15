import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    height: '100%',
    display: 'flex',
    padding: 16,
    backgroundColor: fade(theme.palette.secondary.light, 0.1),
    border: `1px solid ${theme.palette.grey[300]}`,
  },
  filter: {
    border: `1px solid ${theme.palette.grey[300]}`,
    marginRight: '5px',
  },
}))
