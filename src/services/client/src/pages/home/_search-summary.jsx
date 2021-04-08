import { useContext } from 'react'
import { context as globalContext } from '../../contexts/global'
import { gql, useQuery } from '@apollo/client'
import Fade from '@material-ui/core/Fade'
import { CATALOGUE_API_GQL_ADDRESS } from '../../config'

export default () => {
  const { global } = useContext(globalContext)
  const { error, loading, data } = useQuery(
    gql`
      query catalogue($text: String!) {
        catalogue {
          id
          records(text: $text) {
            totalCount
          }
        }
      }
    `,
    {
      variables: { text: global.text || '' },
      fetchPolicy: 'cache-first',
    }
  )

  if (error) {
    throw new Error(
      `${CATALOGUE_API_GQL_ADDRESS}: ${error}\n\nIt is likely that Elasticsearch has not been configured`
    )
  }

  return loading ? (
    <Fade key="waiting" in={loading}>
      <span>...</span>
    </Fade>
  ) : (
    <Fade key="results" in={!loading}>
      <span>{data?.catalogue.records.totalCount} records</span>
    </Fade>
  )
}
