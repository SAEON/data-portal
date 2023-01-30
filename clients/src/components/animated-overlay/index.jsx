import Fade from '@mui/material/Fade'
import { Div } from '../html-tags'
import { keyframes } from '@mui/material/styles'

const animation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

export default () => (
  <Fade in>
    <Div
      sx={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        background: `linear-gradient(
                        45deg,
                        rgba(18, 0, 0, 0.55),
                        rgba(0, 18, 0, 0.55),
                        rgba(0, 0, 18, 0.55)
                    )`,
        backgroundSize: '600% 600%',
        animation: `${animation} 5s ease infinite`,
      }}
    />
  </Fade>
)
