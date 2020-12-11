import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  layout: {
    backgroundColor: fade(theme.palette.common.white, 0.75),
    margin: theme.spacing(1),
    position: 'relative',
  },
}))
