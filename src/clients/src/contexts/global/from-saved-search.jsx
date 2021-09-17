import Loading from '../../components/loading'
import { gql } from '@apollo/client'
import WithGqlQuery from './with-gql-query'

export default ({ id, children }) =>
  id ? (
    <WithGqlQuery
      QUERY={gql`
        query ($id: ID!) {
          list(id: $id) {
            id
            search
            title
            description
            referrer
            url
            createdBy
            disableSidebar
            showSearchBar
            type
          }
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

        return children(data?.list.search)
      }}
    </WithGqlQuery>
  ) : (
    children()
  )
