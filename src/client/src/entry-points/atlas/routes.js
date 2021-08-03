import { lazy } from 'react'
import Transition from '../../components/page-transition'
import { Redirect } from 'react-router-dom'

const AtlasPage = lazy(() => import('../../pages/atlas'))

export default [
  {
    label: 'Collection',
    to: '/collection',
    exact: false,
    render: ({ location: { pathname } }) => {
      return <Redirect to={pathname.replace('/collection', '')} />
    },
  },
  {
    label: 'Atlas',
    to: '/atlas/:id',
    exact: true,
    render: props => (
      <Transition tKey="atlas">
        <AtlasPage id={props.match.params.id} {...props} />
      </Transition>
    ),
  },
]
