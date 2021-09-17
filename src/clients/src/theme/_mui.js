export default {
  shape: {
    borderRadius: 2,
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
      main: '#002791',
      // dark calculated from main
    },
  },
  status: {
    danger: 'orange',
  },
}
