import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => {
  return {
    toolbar: {},
    'small-icon-button': {
      padding: 3,
    },
    tools: {
      backgroundColor: theme.palette.grey[100],
    },
  }
})
