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
  MuiButton: {
    root: {
      '&$disabled': {},
    },
  },
})
