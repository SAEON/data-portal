import { createMuiTheme } from '@material-ui/core/styles'

const defaultTheme = createMuiTheme()

export default createMuiTheme({
  customSizes: {
    thickToolbar: {
      minHeight: 128,
    },
  },
  shape: {
    borderRadius: 2,
  },
  overrides: {
    MuiTypography: {
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
    MuiPaper: {
      rounded: {
        borderRadius: 2,
      },
      outlined: {
        border: 'none',
        borderBottom: `1px solid ${defaultTheme.palette.grey[200]}`,
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
      main: '#051d40',
      // dark calculated from main
    },
    secondary: {
      // light calculated from main
      main: '#dee1e5',
      // dark calculated from main
    },
  },
  status: {
    danger: 'orange',
  },
})
