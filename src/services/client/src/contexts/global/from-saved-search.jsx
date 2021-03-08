import Loading from '../../components/loading'
import { gql } from '@apollo/client'
import WithGqlQuery from './with-gql-query'

export default ({ id, children }) =>
  id ? (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          searchState(id: $id)
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw new Error('Unable to load saved search.' + error.message)
        }

        return children(data?.searchState.search)
      }}
    </WithGqlQuery>
  ) : (
    children()
  )
