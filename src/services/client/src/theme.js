import { createMuiTheme } from '@material-ui/core/styles'

export default createMuiTheme({
  customSizes: {
    thickToolbar: {
      minHeight: 128,
    },
  },
  overrides: {
    MuiToolbar: {
      gutters: {
        // TODO - this should be dynamic
        '@media (min-width: 600px)': {
          paddingLeft: 16,
          paddingRight: 16,
        },
      },
    },
    MuiPaper: {
      rounded: {
        borderRadius: 0,
      },
      outlined: {
        border: 'none',
      },
    },
    MuiButton: {
      root: {
        '&$disabled': {},
      },
    },
  },
  MuiTypography: {
    variantMapping: {
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      subtitle1: 'h2',
      subtitle2: 'h2',
      body1: 'span',
      body2: 'span',
    },
  },
  palette: {
    type: 'light',
    contrastThreshold: 3,
    primary: {
      // light calculated from main
      main: '#051d40e6',
      // dark calculated from main
    },
    secondary: {
      // light calculated from main
      main: '#adb5c080',
      // dark calculated from main
    },
  },
  status: {
    danger: 'orange',
  },
})
