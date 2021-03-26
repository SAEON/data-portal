import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => {
  return {
    layout: {
      backgroundColor: theme.backgroundColor,
      margin: theme.spacing(1),
      padding: '16px',
    },
    select: {
      color: 'white',
    },
    formControl: {
      margin: theme.spacing(1),
      width: '150px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      borderRadius: '6px',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    drawer: {
      maxWidth: 400,
      margin: '10px',
      '& .close-button': { color: theme.palette.info.dark },
    },
  }
})
