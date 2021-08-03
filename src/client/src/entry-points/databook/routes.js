import { lazy } from 'react'
import Transition from '../../components/page-transition'
import DatabookIcon from 'mdi-react/DatabaseCogIcon'

const DatabookPage = lazy(() => import('../../pages/databook'))

export default [
  {
    label: 'Databook',
    to: '/databooks/:id',
    exact: true,
    Icon: DatabookIcon,
    render: props => (
      <Transition tKey="databook">
        <DatabookPage id={props.match.params.id} {...props} />
      </Transition>
    ),
  },
]
