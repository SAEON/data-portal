import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(theme => ({
  grid: {
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    position: 'fixed',
  },

  card: {
    display: 'flex',
  },
  cardContentContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardContent: {
    flex: '1 0 auto',
  },
  cardControls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  cardMedia: {
    // flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    alignSelf: 'flex-end',
  },
}))
