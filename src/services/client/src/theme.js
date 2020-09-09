import { createMuiTheme } from '@material-ui/core/styles'
import { blue, blueGrey } from '@material-ui/core/colors'

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
    primary: {
      main: blue[900],
    },
    secondary: {
      main: blueGrey[100],
    },
  },
  status: {
    danger: 'orange',
  },
})
