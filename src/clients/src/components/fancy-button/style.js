import { alpha } from '@mui/material/styles'

import makeStyles from '@mui/styles/makeStyles'

export default makeStyles(theme => ({
  button: {
    '&:hover': {
      '& $bg': {
        opacity: 0.15,
      },
      '& $title': {
        border: '1px solid currentColor',
        color: alpha(theme.palette.common.white, 0.8),
      },
    },
  },
  bg: {
    opacity: 0.5,
  },
  title: {
    color: alpha(theme.palette.common.white, 1),
    border: `1px solid ${alpha(theme.palette.common.white, 0)}`,
  },
}))
