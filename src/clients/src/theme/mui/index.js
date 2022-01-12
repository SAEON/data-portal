import { createTheme } from '@mui/material/styles'

const theme = createTheme()

export default createTheme(theme, {
  shape: {
    borderRadius: 2,
  },
  palette: {
    mode: 'light',
    contrastThreshold: 3,
    primary: {
      main: '#051d40',
    },
    secondary: {
      main: '#002791',
    },
  },
  components: {
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
  },
  typography: {
    h1: {
      fontSize: '2.5rem',
    },
    h2: {
      fontSize: '2rem',
    },
    h5: {
      fontSize: '1.2rem',
    },
    h6: {
      fontSize: '1rem',
    },
  },
})
