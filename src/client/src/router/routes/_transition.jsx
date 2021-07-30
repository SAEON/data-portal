import { Suspense } from 'react'
import Fade from '@material-ui/core/Fade'
import Loading from '../../components/loading'

export default ({ children, tKey }) => {
  if (location.pathname === '/') {
    window.scrollTo(0, 0)
  } else {
    window.scrollTo(0, 1)
  }

  return (
    <Fade key={tKey} in={true}>
      <div>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </Fade>
  )
}
