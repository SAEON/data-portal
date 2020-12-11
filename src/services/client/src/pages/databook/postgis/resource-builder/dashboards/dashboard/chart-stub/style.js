import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    height: '100%',
    display: 'flex',
    padding: 16,
    backgroundColor: fade(theme.palette.secondary.light, 0.1),
  },
}))
