import { Suspense } from 'react'
import Fade from '@material-ui/core/Fade'
import Loading from '../../components/loading'

export default ({ children, tKey }) => {
  return (
    <Fade key={tKey} in={true}>
      <span>
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </span>
    </Fade>
  )
}
