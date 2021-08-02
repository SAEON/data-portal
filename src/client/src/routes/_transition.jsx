import { Suspense } from 'react'
import Fade from '@material-ui/core/Fade'
import Loading from '../components/loading'

export default ({ children, tKey }) => {
  window.scrollTo(0, 0)

  return (
    <Fade key={tKey} in={true}>
      <div style={{ position: 'relative', height: '100%' }}>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </Fade>
  )
}
