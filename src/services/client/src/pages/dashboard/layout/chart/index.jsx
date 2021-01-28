import ChartController from '../../../../components/chart-controller'
import { useContext } from 'react'
import { context as dashboardContext } from '../../context'

export default ({ id }) => {
  const { filterIds, selectedFilters } = useContext(dashboardContext)
  return <ChartController id={id} filterIds={filterIds} selectedFilters={selectedFilters} />
}
