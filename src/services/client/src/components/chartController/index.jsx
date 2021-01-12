import { lazy, Suspense } from 'react'
import { WithGqlQuery } from '../../hooks'
import Loading from '../loading'
import { gql } from '@apollo/client'
import chartDefinitions from '../charts'
import { Fade } from '@material-ui/core'

export default ({ id, style = {}, filterIds, selectedFilters }) => {
  // export default props => {
  // const { id, style = {}, filters } = props
  return (
    <WithGqlQuery
      QUERY={gql`
        query($chartIds: [ID!], $filterIds: [ID!]) {
          charts(ids: $chartIds) {
            id
            title
            description
            type
            config
            data
          }
          filters(ids: $filterIds) {
            id
            name
            columnFiltered
            sql
            selectedValues
            values
          }
        }
      `}
      variables={{ chartIds: [id], filterIds }}
    >
      {({ error, loading, data }) => {
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
        console.log('initial filteredData', filteredData)
        for (var i = 0; i < filters.length; i++) {
          const { columnFiltered, id: filterId } = filters[i]
          const { selectedValues } = selectedFilters[filterId]
          console.log('selectedValues', selectedValues)
          filteredData =
            selectedValues === []
              ? filteredData
              : filteredData.filter(row => {
                  //potential to-do: if chart.data column names don't include columnFiltered: Skip this filter (possibly help performance if needed)
                  if (!row[columnFiltered]) {
                    console.log('1')
                    return true
                  }
                  if (selectedValues.includes(row[columnFiltered])) {
                    console.log('2')
                    return true
                  }
                  console.log('3')
                  return false
                })
        }
        let filteredChartDoc = Object.assign({}, chartDoc, {
          data: filteredData,
        })
        console.log('filteredChartDoc', filteredChartDoc)
        //foreach filter in filers:
        //filter chart data
        /**<Chart {Object.assign({}, chartDoc, {chartDoc.data.filter(datum => {
          then apply each filter. Try to loop over data only once
          It's okay to loop over the filters multiple times since there will be few of them 
          return true | false
        })})} /> */
        return (
          <Fade in={Boolean(data)} key={`chart-${id}`}>
            <span>
              <Suspense fallback={<Loading />}>
                <div
                  style={Object.assign(
                    { height: '100%', width: '100%', position: 'relative' },
                    style
                  )}
                >
                  <Chart {...filteredChartDoc} />
                </div>
              </Suspense>
            </span>
          </Fade>
        )
      }}
    </WithGqlQuery>
  )
}
