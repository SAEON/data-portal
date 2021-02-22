import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => {
  return {
    skipLink: {
      position: 'absolute',
      zIndex: 5000,
      top: -400,
      background: theme.palette.common.black,
      color: theme.palette.common.white,
      padding: theme.spacing(2),
      '&:focus': {
        top: 0,
      },
    },
  }
})
