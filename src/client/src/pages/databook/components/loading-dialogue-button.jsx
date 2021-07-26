import useTheme from '@material-ui/core/styles/useTheme'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'

export default ({ loading }) => {
  const theme = useTheme()

  return (
    <Fade in={loading} key={'loading-dialogue-button-in'}>
      <div style={{ display: 'flex', margin: `0 ${theme.spacing(1)}px ${theme.spacing(1)}px 0` }}>
        <CircularProgress thickness={2} size={22} />
      </div>
    </Fade>
  )
}
