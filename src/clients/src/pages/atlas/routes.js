import { lazy } from 'react'
import Transition from '../../components/page-transition'

const AtlasPage = lazy(() => import('../../modules/atlas'))

export default [
  {
    label: 'Atlas',
    to: '/atlas/:id',
    exact: true,
    render: props => (
      <Transition tKey="atlas">
        <AtlasPage id={props.match.params.id} {...props} />
      </Transition>
    )
  }
]
