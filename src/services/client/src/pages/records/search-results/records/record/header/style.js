import { makeStyles } from '@material-ui/core/styles'

// eslint-disable-next-line no-unused-vars
export default makeStyles(theme => {
  return {
    title: {
      marginRight: 'auto',
      marginLeft: 16,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '0.6rem',
    },
    toolbar: {},
    'small-icon-button': {
      padding: 3,
    },
  }
})
