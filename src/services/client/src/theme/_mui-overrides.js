import { alpha } from '@material-ui/core/styles/colorManipulator'

export default theme => ({
  MuiTypography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
  MuiToolbar: {
    gutters: {
      // TODO - this should be dynamic
      '@media (min-width: 600px)': {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
  },
  MuiLinearProgress: {
    barColorPrimary: {},
    barColorSecondary: {},
    root: {
      height: theme.spacing(0.5),
    },
  },
  MuiAppBar: {
    colorPrimary: {
      border: 'none',
      borderBottom: `1px solid ${alpha(theme.palette.grey[200], 0.6)}`,
    },
  },
  MuiPaper: {
    rounded: {
      borderRadius: 2,
    },
    outlined: {
      border: `1px solid ${alpha(theme.palette.grey[200], 0.6)}`,
    },
  },
  MuiButton: {
    root: {
      '&$disabled': {},
    },
  },
})
