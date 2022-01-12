import makeStyles from '@mui/styles/makeStyles'
import { alpha } from '@mui/material/styles'

export default makeStyles(theme => {
  return {
    layout: {
      backgroundColor: alpha(theme.palette.common.white, 0.9),
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
      width: 400,
      margin: '10px',
      '& .close-button': { color: theme.palette.info.dark },
    },
  }
})
