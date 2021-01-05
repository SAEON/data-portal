import { makeStyles, fade } from '@material-ui/core/styles'

export default makeStyles(theme => {
  console.log('theme', theme)
  return {
    layout: {
      backgroundColor: fade(theme.palette.common.white, 0.8),
      margin: theme.spacing(1),
      position: 'relative',
    },
    button: {
      margin: theme.spacing(1),
      width: '150px',
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      borderRadius: '6px',
      justifyContent: 'space-between',
      '&:hover': {
        backgroundColor: theme.palette.primary.light,
      },
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
    icon: { color: 'white' },
  }
})
