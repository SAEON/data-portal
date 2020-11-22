import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import { setShareLink, WithGqlQuery } from '../../hooks'
import Loading from '../../components/loading'
import { gql } from '@apollo/client'

export default ({ id }) => {
  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/dashboard?id=${id}`,
    params: false,
  })
  return (
    <WithGqlQuery
      QUERY={gql`
        query($id: ID!) {
          dashboard(id: $id) {
            id
            charts {
              id
            }
          }
        }
      `}
      variables={{ id }}
    >
      {({ error, loading, data }) => {
        if (error) {
          throw error
        }

        if (loading) {
          return <Loading />
        }

        return (
          <>
            {data.dashboard.charts.map(({ id }) => (
              <WithGqlQuery
                QUERY={gql`
                  query($id: ID) {
                    charts(id: $id) {
                      id
                      name
                    }
                  }
                `}
                variables={{ id }}
                key={id}
              >
                {({ error, loading, data }) => {
                  if (error) {
                    throw error
                  }

                  if (loading) {
                    return <Loading />
                  }

                  const chart = data.charts

                  return <div>{JSON.stringify(chart)}</div>
                }}
              </WithGqlQuery>
            ))}
          </>
        )
      }}
    </WithGqlQuery>
  )
}
