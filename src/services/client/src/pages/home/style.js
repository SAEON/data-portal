import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  textField: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: 'rgba(110,110,110,0.7)',
    '& input': {
      color: 'white',
    },
    '& div': {
      padding: 0,
    },
  },
  notMobile: {
    margin: '0 25%',
  },
  mobile: {
    margin: 'auto',
  },
}))
