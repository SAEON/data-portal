import { useTheme } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'

export default ({ loading }) => {
  const theme = useTheme()

  return (
    <Fade in={loading} key={'loading-dialogue-button-in'}>
      <div style={{ display: 'flex', margin: `0 ${theme.spacing(1)} ${theme.spacing(1)} 0` }}>
        <CircularProgress thickness={2} size={22} />
      </div>
    </Fade>
  )
}
