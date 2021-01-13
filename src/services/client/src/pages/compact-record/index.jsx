import { gql } from '@apollo/client'
import Loading from '../../components/loading'
import WithGqlQuery from '../../hooks/with-gql-query'
import { setShareLink } from '../../hooks/use-share-link'
import { CATALOGUE_CLIENT_ADDRESS } from '../../config'
import CompactRecord from '../records/search-results/records/record'

export default ({ id = undefined, doi = undefined }) => {
  if (!id && !doi) {
    throw new Error(`No record id or DOI specified in the URI as a paramter`)
  }

  setShareLink({
    uri: `${CATALOGUE_CLIENT_ADDRESS}/render/record?id=${id}`,
    params: false,
  })

  return (
    <WithGqlQuery
      QUERY={gql`
        query catalogue($ids: [ID!], $dois: [String!], $size: Int) {
          catalogue {
            id
            records(ids: $ids, dois: $dois, size: $size) {
              nodes {
                metadata
              }
            }
          }
        }
      `}
      variables={{ ids: [id].filter(_ => _), dois: [doi].filter(_ => _), size: 1 }}
    >
      {({ loading, error, data }) => {
        if (loading) {
          return <Loading />
        }

        if (error) {
          throw new Error(`Error retrieving record ${id}. ${error}`)
        }

        const _source = data.catalogue.records.nodes[0].metadata._source

        return (
          <CompactRecord
            showDatabook={false}
            showPreview={false}
            showDownload={true}
            showSelect={false}
            {..._source}
          />
        )
      }}
    </WithGqlQuery>
  )
}
