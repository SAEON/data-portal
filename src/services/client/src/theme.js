import { createMuiTheme } from '@material-ui/core/styles'
import { lightBlue, orange } from '@material-ui/core/colors'

export default createMuiTheme({
  customSizes: {
    thickToolbar: {
      minHeight: 128,
    },
  },
  overrides: {
    MuiPaper: {
      outlined: {},
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
      main: lightBlue[900],
      contrastText: '#fff',
    },
    secondary: {
      main: orange[700],
      contrastText: '#fff',
    },
  },
  status: {
    danger: 'orange',
  },
})
