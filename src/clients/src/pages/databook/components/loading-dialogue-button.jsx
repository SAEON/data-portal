import { styled } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'

const Div = styled('div')(({ theme }) => ({
  display: 'flex',
  margin: `0 ${theme.spacing(1)} ${theme.spacing(1)} 0`,
}))

export default ({ loading }) => {
  return (
    <Fade in={loading} key={'loading-dialogue-button-in'}>
      <Div>
        <CircularProgress thickness={2} size={22} />
      </Div>
    </Fade>
  )
}
