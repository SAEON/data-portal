import { lazy, Suspense } from 'react'
import { useQuery } from '@apollo/client'
import Loading from '../loading'
import { gql } from '@apollo/client'
import chartDefinitions from '../charts'
import Fade from '@mui/material/Fade'

export default ({ id, style = {}, filterIds = [], selectedFilters }) => {
  const { error, loading, data } = useQuery(
    gql`
      query($chartIds: [ID!]!, $filterIds: [ID!]!) {
        charts(ids: $chartIds) {
          id
          title
          description
          type
          config
          data
          setOption
        }
        filters(ids: $filterIds) {
          id
          name
          columnFiltered
          sql
          values
        }
      }
    `,
    {
      variables: { chartIds: [id], filterIds }
    }
  )

  if (loading) {
    return <Loading />
  }

  if (error) {
    throw error
  }

  const { charts, filters } = data

  let chartDoc = charts.find(({ id: _id }) => _id === id)
  const chartDefinition = chartDefinitions.find(({ type }) => type === chartDoc.type)
  const Chart = lazy(() => chartDefinition.getComponent())

  let filteredData = chartDoc.data
  for (var i = 0; i < filters.length; i++) {
    const { columnFiltered, id: filterId } = filters[i]
    const { selectedValues } = selectedFilters[filterId]

    filteredData = filteredData.filter(row => {
      return selectedValues.length === 0 || //if filter isn't used
      !row[columnFiltered] || //if column being filtered isn't in of data
        selectedValues.includes(String(row[columnFiltered])) //if this data cell was explicitely selected by user
        ? true
        : false
    })
  }
  let filteredChartDoc = Object.assign({}, chartDoc, {
    data: filteredData
  })

  return (
    <Fade in={Boolean(data)} key={`chart-${id}`}>
      <span>
        <Suspense fallback={<Loading />}>
          <div
            style={Object.assign({ height: '100%', width: '100%', position: 'relative' }, style)}
          >
            <Chart {...filteredChartDoc} />
          </div>
        </Suspense>
      </span>
    </Fade>
  )
}
