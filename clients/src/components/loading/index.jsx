import LinearProgress from '@mui/material/LinearProgress'
import { Div } from '../html-tags'

export default ({ sx, style = {}, withHeight = false }) => {
  if (withHeight) {
    return (
      <Div sx={{ height: 1000 }}>
        <LinearProgress
          sx={{ position: 'absolute', left: 0, right: 0, zIndex: 1099, ...(sx || style) }}
        />
      </Div>
    )
  }

  return (
    <LinearProgress
      sx={{ position: 'absolute', left: 0, right: 0, zIndex: 1099, ...(sx || style) }}
    />
  )
}
