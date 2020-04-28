import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  dialAction: {
    height: 50,
    width: 50,
  },
  menuIcon: {
    opacity: 0.8,
    '&:hover': {
      opacity: 1,
    },
  },
}))
