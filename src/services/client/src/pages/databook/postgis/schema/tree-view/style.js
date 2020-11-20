import { fade, makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  sideBar: {},
  text: { fontFamily: 'monospace', fontSize: 'small' },
  secondaryText: {
    color: fade(theme.palette.common.black, 0.4),
  },
  icon: { marginBottom: -6, marginRight: 0, marginLeft: -6 },
}))
