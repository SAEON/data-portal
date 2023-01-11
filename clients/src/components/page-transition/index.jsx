import { Suspense } from 'react'
import Fade from '@mui/material/Fade'
import Loading from '../loading'
import { Div } from '../../components/html-tags'

const Fallback = () => (
  <Div sx={{ height: 1000 }}>
    <Loading />
  </Div>
)

export default ({ children, tKey }) => {
  window.scrollTo(0, 0)

  return (
    <Fade key={tKey} in={true}>
      <Div sx={{ position: 'relative', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Suspense fallback={<Fallback />}>{children}</Suspense>
      </Div>
    </Fade>
  )
}
