import { makeStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'

export default makeStyles(theme => ({
  toolbar: {
    backgroundColor: fade(theme.palette.common.white, 0.5),
    borderBottom: `1px solid ${theme.palette.grey[300]}`,
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))
