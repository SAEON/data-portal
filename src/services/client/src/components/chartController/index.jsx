import { lazy, Suspense } from 'react'
import { WithGqlQuery } from '../../hooks'
import Loading from '../loading'
import { gql } from '@apollo/client'
import chartDefinitions from '../charts'
import { Fade } from '@material-ui/core'

// export default ({ id, style = {}, filters }) => {
export default props => {
  console.log('chartController props', props)
  const { id, style = {}, filters } = props
  return (
    <WithGqlQuery
      QUERY={gql`
        query($ids: [ID!]) {
          charts(ids: $ids) {
            id
            title
            description
            type
            config
            data
          }
        }
      `}
      variables={{ ids: [id] }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw error
        }
        console.log('data', data)
        const chartDoc = data.charts.find(({ id: _id }) => _id === id)
        const chartDefinition = chartDefinitions.find(({ type }) => type === chartDoc.type)
        const Chart = lazy(() => chartDefinition.getComponent())
        console.log('chartDoc', chartDoc)
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
                  <Chart {...chartDoc} />
                </div>
              </Suspense>
            </span>
          </Fade>
        )
      }}
    </WithGqlQuery>
  )
}
