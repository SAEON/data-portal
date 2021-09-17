import { lazy } from 'react'
import Transition from '../../components/page-transition'

const ChartPage = lazy(() => import('../../pages/chart'))

export default [
  {
    label: 'Chart',
    to: '/chart/:id',
    exact: true,
    render: props => (
      <Transition tKey="chart">
        <ChartPage id={props.match.params.id} {...props} />
      </Transition>
    ),
  },
]
