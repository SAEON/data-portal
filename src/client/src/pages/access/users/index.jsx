import { useContext, lazy, Suspense } from 'react'
import { context as userRolesContext } from '../context'
import Loading from '../../../components/loading'

const Render = lazy(() => import('./_render'))

export default ({ active }) => {
  const { users } = useContext(userRolesContext)

  if (!active) {
    return null
  }

  return (
    <Suspense fallback={<Loading />}>
      <Render users={users} />
    </Suspense>
  )
}
