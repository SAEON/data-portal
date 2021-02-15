import makeStyles from '@material-ui/core/styles/makeStyles'

export default makeStyles(theme => ({
  link: {
    color: theme.palette.primary,
    display: 'inline-block',
    textDecoration: 'none',
    transition: `color ${theme.transitions.duration.standard}`,
    cursor: 'pointer',

    '&:hover': {
      color: theme.palette.text.primary,
      textDecoration: 'underline',
    },
  },
}))
