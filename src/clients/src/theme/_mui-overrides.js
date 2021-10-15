export default theme => ({
  MuiTypography: {
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
  MuiToolbar: {
    gutters: {
      [theme.breakpoints.up('sm')]: {
        paddingLeft: 16,
        paddingRight: 16,
      },
    },
  },
  MuiButton: {
    root: {
      '&$disabled': {},
    },
  },
})
