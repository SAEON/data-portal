import { lazy } from 'react'
import Transition from '../../components/page-transition'

const DashboardPage = lazy(() => import('../../pages/dashboard'))

export default [
  {
    label: 'Dashboard',
    to: '/dashboard/:id',
    exact: true,
    render: props => (
      <Transition tKey="dashboard">
        <DashboardPage id={props.match.params.id} {...props} />
      </Transition>
    ),
  },
]
