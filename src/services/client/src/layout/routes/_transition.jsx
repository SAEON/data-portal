import React, { Suspense } from 'react'
import { Fade } from '@material-ui/core'
import { Loading } from '../../components'

export default ({ children, tKey }) => (
  <Fade key={tKey} in={true}>
    <div>
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </div>
  </Fade>
)
